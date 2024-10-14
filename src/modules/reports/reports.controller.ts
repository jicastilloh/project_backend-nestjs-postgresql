import { Controller, Get, Res, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  private isBuffer(obj: any): obj is Buffer {
    return Buffer.isBuffer(obj);
  }

  @Get()
  async getReport(@Res() res: Response, @Query('startDate') startDate: string, @Query('endDate') endDate: string) {

    const pdfBuffer = await this.reportsService.getReport(new Date(startDate), new Date(endDate));

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf',
    });

    res.end(pdfBuffer);
  }
}
