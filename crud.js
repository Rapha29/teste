const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/usuario', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => res.send('Conectado ao BD'))
app.listen(port, () => console.log(`port ${port}!`)) = require('mongoose');
const bodyParser = require('body-parser');

// Conectar ao banco de dados
mongoose.connect('mongodb://localhost:27017/usuarios', { useNewUrlParser: true })
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados', err);
  });

// Definir o esquema do usuário
const usuarioSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  dataNascimento: Date
});

// Definir o modelo do usuário
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Criar o servidor
app = express();
app.use(bodyParser.json());

//lista usuários
app.get('/usuario', (req, res) => {
  Usuario.find((err, usuarios) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(usuarios);
    }
  });
});

//cadastra usuário
app.post('/usuario', (req, res) => {
  const usuario = new Usuario(req.body);
  usuario.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(usuario);
    }
  });
});

//exibe dados
app.get('/usuario/:nome', (req, res) => {
  Usuario.findOne({ nome: req.params.nome }, (err, usuario) => {
    if (err) {
      res.status(500).send(err);
    } else if (!usuario) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.send(usuario);
    }
  });
});

// atualiza dados
app.put('/usuario/:nome', (req, res) => {
  Usuario.findOneAndUpdate({ nome: req.params.nome }, req.body, { new: true }, (err, usuario) => {
    if (err) {
      res.status(500).send(err);
    } else if (!usuario) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.send(usuario);
    }
  });
});

//deleta usuário
app.delete('/usuario/:nome', (req, res) => {
  Usuario.findOneAndDelete({ nome: req.params.nome }, (err, usuario) => {
    if (err) {
      res.status(500).send(err);
    } else if (!usuario) {
      res.status(404).send('Usuário não encontrado');
    } else {
      res.send(usuario);
    }
  });
});

// exibe idade
app.get('/usuario/idade/:nome', (req, res) => {
  Usuario.findOne({ nome: req.params.nome }, (err, usuario) => {
    if (err) {
      res.status(500).send(err);
    } else if (!usuario) {
        res.status(404).send('Usuário não encontrado');
    } else {
      res.send(usuario);
    }
  });
});
