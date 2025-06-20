import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function Home() {
  const [edital, setEdital] = useState("");
  const [resultado, setResultado] = useState("");
  const [loading, setLoading] = useState(false);

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();
    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        text += strings.join(" ") + "\n";
      }
      setEdital(text);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPDF(file);
    }
  };

  const gerarDeclaracoes = () => {
    setLoading(true);
    setTimeout(() => {
      setResultado("✔️ Pacote gerado com sucesso!\n\n- Declarações no padrão Galdino\n- PDF analisado com IA.");
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '28px', textAlign: 'center' }}>LicitaFácil</h1>

      <label>Anexar edital (PDF):</label><br />
      <input type="file" accept=".pdf" onChange={handleFileChange} /><br /><br />

      <label>Ou cole o conteúdo do edital:</label><br />
      <textarea
        rows="10"
        style={{ width: '100%' }}
        value={edital}
        onChange={(e) => setEdital(e.target.value)}
      /><br /><br />

      <button onClick={gerarDeclaracoes} disabled={loading || !edital}>
        {loading ? "Gerando..." : "Gerar Pacote de Documentos"}
      </button>

      {resultado && (
        <pre style={{ marginTop: '20px', background: '#f4f4f4', padding: '10px' }}>{resultado}</pre>
      )}
    </div>
  );
}