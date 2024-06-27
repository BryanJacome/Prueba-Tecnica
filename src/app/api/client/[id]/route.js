import { getConnection } from "@/libs/mysql";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;

    try {
        const connection = await getConnection();

        const query = `
            SELECT *
            FROM UserInformation
            WHERE id = ?
        `;

        const [rows, fields] = await connection.query(query, [id]);

        await connection.end();

        if (rows.length === 0) {
            return NextResponse.json({ message: 'Cliente no encontrado' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


export async function PUT(request, { params }) {
    const { id } = params;
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
            UPDATE UserInformation
            SET 
                name = ?,
                lastName = ?,
                ci = ?,
                dateOfBirth = ?,
                hasRuc = ?,
                rucNumber = ?,
                gender = ?,
                hasFarm = ?,
                farmHa = ?,
                farmName = ?,
                crops = ?,
                family = ?,
                hasWorkers = ?,
                totalWorkers = ?,
                menWorkers = ?,
                womanWorkers = ?,
                over18Workers = ?,
                under18Workers = ?,
                minorWorkersOcuppacion = ?,
                hasPregnandWorkers = ?,
                pregnandWorkers = ?,
                pregnandWorkersOcuppacion = ?
            WHERE id = ?
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
            pregnandWorkersOcuppacion,
            id
        ];

        const result = await connection.query(query, values);

        await connection.end();

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Registro no encontrado para actualizar' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Registro actualizado correctamente' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const { id } = params;

    try {
        const connection = await getConnection();

        const query = `
            DELETE FROM UserInformation
            WHERE id = ?
        `;

        const [result] = await connection.query(query, [id]);

        await connection.end();

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Cliente no encontrado para eliminar' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}