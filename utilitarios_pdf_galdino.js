import jsPDF from 'jspdf';

export async function salvarPDFcomTimbreGaldino({ paginas }) {
  const doc = new jsPDF();
  const addPage = (pagina, i) => {
    if (i > 0) doc.addPage();
    doc.setFontSize(14);
    doc.text(pagina.titulo, 105, 20, { align: "center" });
    doc.setFontSize(11);
    doc.text(pagina.conteudo, 20, 40, { maxWidth: 170 });
  };
  paginas.forEach((p, i) => addPage(p, i));
  doc.save("pacote_completo_galdino.pdf");
}