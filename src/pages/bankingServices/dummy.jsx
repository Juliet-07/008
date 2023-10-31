import React from "react";
import XLSX from "xlsx"; // For Excel export
import jsPDF from "jspdf"; // For PDF export
import html2canvas from "html2canvas"; // For converting HTML to PDF

const Dummy = () => {
  const exportToExcel = () => {
    // Your code to prepare data for Excel export

    const ws = XLSX.utils.json_to_sheet(yourData); // Convert data to worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DudChequeReport"); // Add worksheet to the workbook

    // Generate and save the Excel file
    XLSX.writeFile(wb, "DudChequeReport.xlsx");
  };

  const exportToPDF = () => {
    // Your code to prepare data for PDF export
    const pdf = new jsPDF();

    // Use html2canvas to capture the content in the modal and convert it to PDF
    html2canvas(document.getElementById("modal-content")).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("DudChequeReport.pdf");
    });
  };

  return (
    <div>
      <div>Dummy</div>
      <div>
        <Modal isVisible={details} onClose={() => setDetails(false)}>
          <div id="modal-content" className="flex flex-col w-[800px] px-4">
            {/* ... Your content in the modal ... */}
            <div className="mt-4">
              <button onClick={exportToExcel} className="btn">
                Export to Excel
              </button>
              <button onClick={exportToPDF} className="btn">
                Export to PDF
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Dummy;
