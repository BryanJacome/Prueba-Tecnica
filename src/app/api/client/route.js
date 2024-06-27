import { getConnection } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const connection = await getConnection();

        const query = `
            SELECT *
            FROM UserInformation
        `;

        const [rows, fields] = await connection.query(query);

        await connection.end();

        return NextResponse.json(rows);
    } catch (error) {

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    const data = await request.json();

    try {
        const connection = await getConnection();

        const {
            name,
            lastName,
            ci,
            dateOfBirth,
            hasRuc,
            rucNumber,
            gender,
            hasFarm,
            farmHa,
            farmName,
            crops,
            family,
            hasWorkers,
            totalWorkers,
            menWorkers,
            womanWorkers,
            over18Workers,
            under18Workers,
            minorWorkersOcuppacion,
            hasPregnandWorkers,
            pregnandWorkers,
            pregnandWorkersOcuppacion
        } = data;

        const query = `
           INSERT INTO UserInformation (
                name,
                lastName,
                ci,
                dateOfBirth,
                hasRuc,
                rucNumber,
                gender,
                hasFarm,
                farmHa,
                farmName,
                crops,
                family,
                hasWorkers,
                totalWorkers,
                menWorkers,
                womanWorkers,
                over18Workers,
                under18Workers,
                minorWorkersOcuppacion,
                hasPregnandWorkers,
                pregnandWorkers,
                pregnandWorkersOcuppacion
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            name,
            lastName,
            ci,
            dateOfBirth,
            hasRuc,
            rucNumber,
            gender,
            hasFarm,
            farmHa,
            farmName,
            JSON.stringify(crops),
            JSON.stringify(family),
            hasWorkers,
            totalWorkers,
            menWorkers,
            womanWorkers,
            over18Workers,
            under18Workers,
            minorWorkersOcuppacion,
            hasPregnandWorkers,
            pregnandWorkers,
            pregnandWorkersOcuppacion
        ];

        const result = await connection.query(query, values);
        await connection.end();

        return NextResponse.json({ message: 'Datos insertados correctamente' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}        