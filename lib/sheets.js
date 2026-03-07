// lib/sheets.js
// Google Sheets API helper using service account credentials

import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

export async function getAuthClient() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: SCOPES,
    });
    return auth;
}

export async function getSheetsClient() {
    const auth = await getAuthClient();
    return google.sheets({ version: "v4", auth });
}

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

// ─── REGISTRATIONS ──────────────────────────────────────────────────────────

export async function getAllRegistrations() {
    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Registrations!A2:K",
    });
    const rows = res.data.values || [];
    return rows.map((row) => ({
        id: row[0] || "",
        timestamp: row[1] || "",
        name: row[2] || "",
        college: row[3] || "",
        phone: row[4] || "",
        email: row[5] || "",
        event: row[6] || "",
        teamSize: row[7] || "",
        notes: row[8] || "",
        status: row[9] || "pending",
        teamMembers: row[10] || "",
    }));
}

export async function checkDuplicate(email, event) {
    const registrations = await getAllRegistrations();
    return registrations.some(
        (r) =>
            r.email.toLowerCase() === email.toLowerCase() &&
            r.event === event
    );
}

export async function addRegistration(data) {
    const sheets = await getSheetsClient();
    const id = `REG-${Date.now()}`;
    const timestamp = new Date().toISOString();
    // teamMembers is an array of extra member names (excluding the registrant)
    const membersStr = Array.isArray(data.teamMembers) && data.teamMembers.length
        ? [data.name, ...data.teamMembers].join(", ")
        : data.name;
    const row = [
        id,
        timestamp,
        data.name,
        data.college,
        data.phone,
        data.email,
        data.event,
        data.teamSize,
        data.notes || "",
        "pending",
        membersStr,
    ];
    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Registrations!A:K",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] },
    });
    return id;
}

export async function updateRegistrationStatus(id, status) {
    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Registrations!A:A",
    });
    const rows = res.data.values || [];
    const rowIndex = rows.findIndex((r) => r[0] === id);
    if (rowIndex === -1) throw new Error("Registration not found");
    const sheetRow = rowIndex + 1; // 1-indexed, header is row 1, data starts row 2
    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Registrations!J${sheetRow}`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [[status]] },
    });
}

export async function deleteRegistration(id) {
    const sheets = await getSheetsClient();
    // Get the sheet metadata to find sheetId
    const meta = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
    });
    const sheet = meta.data.sheets.find(
        (s) => s.properties.title === "Registrations"
    );
    if (!sheet) throw new Error("Registrations sheet not found");
    const sheetId = sheet.properties.sheetId;

    // Find row index
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Registrations!A:A",
    });
    const rows = res.data.values || [];
    const rowIndex = rows.findIndex((r) => r[0] === id);
    if (rowIndex === -1) throw new Error("Registration not found");

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId,
                            dimension: "ROWS",
                            startIndex: rowIndex,
                            endIndex: rowIndex + 1,
                        },
                    },
                },
            ],
        },
    });
}

// ─── WINNERS ────────────────────────────────────────────────────────────────

export async function getAllWinners() {
    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Winners!A2:E",
    });
    const rows = res.data.values || [];
    return rows.map((row) => ({
        id: row[0] || "",
        event: row[1] || "",
        position: row[2] || "",
        participantName: row[3] || "",
        college: row[4] || "",
    }));
}

export async function addWinner(data) {
    const sheets = await getSheetsClient();
    const id = `WIN-${Date.now()}`;
    const row = [id, data.event, data.position, data.participantName, data.college];
    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: "Winners!A:E",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] },
    });
    return id;
}

export async function updateWinner(id, data) {
    const sheets = await getSheetsClient();
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Winners!A:A",
    });
    const rows = res.data.values || [];
    const rowIndex = rows.findIndex((r) => r[0] === id);
    if (rowIndex === -1) throw new Error("Winner not found");
    const sheetRow = rowIndex + 1;
    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Winners!A${sheetRow}:E${sheetRow}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[id, data.event, data.position, data.participantName, data.college]],
        },
    });
}

export async function deleteWinner(id) {
    const sheets = await getSheetsClient();
    const meta = await sheets.spreadsheets.get({ spreadsheetId: SPREADSHEET_ID });
    const sheet = meta.data.sheets.find((s) => s.properties.title === "Winners");
    if (!sheet) throw new Error("Winners sheet not found");
    const sheetId = sheet.properties.sheetId;

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Winners!A:A",
    });
    const rows = res.data.values || [];
    const rowIndex = rows.findIndex((r) => r[0] === id);
    if (rowIndex === -1) throw new Error("Winner not found");

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId,
                            dimension: "ROWS",
                            startIndex: rowIndex,
                            endIndex: rowIndex + 1,
                        },
                    },
                },
            ],
        },
    });
}
