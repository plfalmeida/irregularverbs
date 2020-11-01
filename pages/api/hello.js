// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.json({ name: 'John Doe' })
}
