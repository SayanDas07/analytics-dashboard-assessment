import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'Electric_Vehicle_Population_Data.csv');
    const file = fs.readFileSync(filePath, 'utf8');

    return new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const cleanData = (results.data as Record<string, string | null>[]).map((row: Record<string, string | null>) => {
            const cleanRow: Record<string, string> = {};
            Object.keys(row).forEach(key => {
              cleanRow[key] = row[key] != null ? String(row[key]).trim() : '';
            });

            return cleanRow;
          });

          resolve(
            NextResponse.json(cleanData, {
              status: 200,
              headers: {
                'Cache-Control': 'public, max-age=3600',
              }
            })
          );
        },
        error: function (error: Error) {
          throw new Error(`Error parsing CSV: ${error}`);
        }
      });
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to process data' },
      { status: 500 }
    );
  }
}