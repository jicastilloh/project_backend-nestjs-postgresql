import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as vfsFonts from 'pdfmake/build/vfs_fonts';
import { MovementsService } from '../movements/movements.service';

@Injectable()
export class ReportsService {
  
  constructor(
    private movementService: MovementsService
  ) {
    pdfMake.vfs = vfsFonts.pdfMake.vfs;
  }
  
  async getReport(startDate: Date, endDate: Date) {

    const movements =  await this.movementService.getMovements(startDate, endDate)

    const totalEntries =  movements
      .filter((m) => m.type === 'entrada')
      .reduce((acc, m) => acc + m.quantity, 0);

    const totalExits =  movements
      .filter((m) => m.type === 'salida')
      .reduce((acc, m) => acc + m.quantity, 0);

      const docDefinition = {
        content: [
          { text: 'Reporte de Movimientos de Productos', style: 'header', fontSize: 15, italics: true, bold: true, alignment: 'center', decoration: 'underline', decorationStyle: 'dotted' },
          { text: `Fecha: ${new Date().toLocaleDateString()}`, style: 'subheader', fontSize: 14, italics: true, alignment: 'center' },
          { text: `Rango de fechas: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`, margin: [0, 0, 0, 20], fontSize: 14, italics: true, alignment: 'center' },
  
          { text: 'Datos Generales para el rango de fechas especificado', bold: true, fontSize: 14, style: 'subheader' },
          { text: `Total de productos que entraron: ${totalEntries}`, fontSize: 12 },
          { text: `Total de productos que salieron: ${totalExits}`, fontSize: 12 },
          { text: '' },
  
          { text: 'Detalles del Reporte', bold: true, fontSize: 14, style: 'subheader' },
          { text: '' },
          {
            table: {
              widths: ['*', '*', '*', '*', '*'],
              body: [
                ['Fecha', 'Producto', 'Categoría', 'Tipo', 'Cantidad'],
                ...movements.map(movement => [
                  movement.createAt,
                  movement.product.name,
                  movement.category.name,
                  movement.type,
                  movement.quantity,
                ])
              ]
            }
          }
        ]
      };

    const pdfDoc = pdfMake.createPdf(docDefinition);

    return new Promise<Buffer>((resolve, reject) => {
      pdfDoc.getBuffer((buffer) => {
        if (buffer) {
          resolve(buffer);
        } else {
          reject('Error generating PDF');
        }
      });
    });

  }
}
