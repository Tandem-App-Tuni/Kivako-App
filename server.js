const express = require ('express')
const app = express();
const http = require('http').Server(app);
const path = require( 'path')

let port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build') + '/index.html');
});

// Proxy endpoints
app.use('/service', createProxyMiddleware({
  target: process.env.REACT_APP_BACKEND_HOST,
  changeOrigin: true,
  pathRewrite: {
      [`^/service`]: '',
  },
}));

app.listen(port, () => {
  console.log(`Kivako app running on port ${port}`);
  console.log('REACT_APP_BACKEND_HOST -----> ', process.env.REACT_APP_BACKEND_HOST);
});