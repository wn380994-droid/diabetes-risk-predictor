import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportToPDF = async (elementId, filename = 'diabetes-report.pdf') => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error('Element not found:', elementId);
    return false;
  }

  try {
    // Font load ဖြစ်တဲ့အထိ စောင့်ပါ (မြန်မာစာ မှန်ဖို့ အရေးကြီး)
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(element, {
      scale: 2,           // ပိုရှင်းအောင်
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    // ပထမစာမျက်နှာ
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= (pdfHeight - 20);

    // နောက်ထပ်စာမျက်နှာများ (ရှိရင်)
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + 10;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= (pdfHeight - 20);
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('❌ PDF Export Error:', error);
    return false;
  }
};