import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const downloadPDF = async (element, fileName = 'CV') => {
  if (!element) {
    throw new Error('No element provided for PDF generation');
  }

  try {
    // Show loading state
    const originalOpacity = element.style.opacity;
    element.style.opacity = '0.9';

    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Restore original opacity
    element.style.opacity = originalOpacity;

    // Download the PDF
    pdf.save(`${fileName.replace(/\s+/g, '_')}.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};