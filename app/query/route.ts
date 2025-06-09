import postgres from 'postgres';

// Conexão com o banco de dados PostgreSQL
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Função para listar faturas de valor 666 com nome do cliente
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  return data;
}

export async function GET() {
  // ⚠️ Este return abaixo impede que o código dentro do try seja executado!
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });

  try {
    // Se o return acima for comentado, essa parte vai executar a consulta
    return Response.json(await listInvoices());
  } catch (error) {
    // Retorna erro com status 500 em caso de falha na consulta
    return Response.json({ error }, { status: 500 });
  }
}
