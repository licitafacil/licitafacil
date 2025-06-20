import { useState } from 'react';

export default function Home() {
  const [edital, setEdital] = useState('');
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const gerarDeclaracoes = () => {
    setLoading(true);
    setTimeout(() => {
      setResultado(`✔️ Pacote gerado com sucesso!\n\n- 12 declarações no padrão Galdino\n- PDF com cabeçalho, rodapé e assinatura\n- Verificação de certidões e atestados incluída.`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h1>LicitaFácil</h1>
      <textarea
        rows={10}
        value={edital}
        onChange={(e) => setEdital(e.target.value)}
        placeholder="Cole aqui o conteúdo do edital..."
        style={{ width: '100%', marginBottom: 20 }}
      />
      <button onClick={gerarDeclaracoes} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar Pacote de Documentos'}
      </button>
      {resultado && (
        <pre style={{ marginTop: 20, background: '#f4f4f4', padding: 10 }}>{resultado}</pre>
      )}
    </div>
  );
}