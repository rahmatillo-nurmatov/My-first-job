const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
  secret: 'animal-marketplace-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Language middleware
app.use((req, res, next) => {
  const lang = req.query.lang || req.session.language || 'en';
  req.session.language = lang;
  res.locals.lang = lang;
  res.locals.t = (key, keyRu) => lang === 'ru' ? keyRu : key;
  next();
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'public/uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// In-memory data storage (in production, use a database)
let users = [];
let animals = [];
let shelters = [];
let messages = [];
let feedback = [];

// Initialize sample data with real photos
function initializeSampleData() {
  // Sample shelters
  shelters = [
    {
      id: '1',
      name: 'Happy Paws Shelter',
      nameRu: 'Приют Счастливые Лапки',
      type: 'shelter',
      rating: 4.8,
      reviews: 156,
      city: 'New York',
      cityRu: 'Нью-Йорк',
      description: 'Dedicated to finding loving homes for abandoned animals',
      descriptionRu: 'Посвящен поиску любящих домов для брошенных животных',
      contact: 'contact@happypaws.org',
      phone: '+1-555-0123',
      address: '123 Animal Street, New York, NY 10001',
      addressRu: '123 Животная улица, Нью-Йорк, NY 10001',
      website: 'https://happypaws.org',
      established: '2015',
      animals: [],
      logo: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '2',
      name: 'Golden Retriever Breeders',
      nameRu: 'Заводчики Золотистых Ретриверов',
      type: 'breeder',
      rating: 4.9,
      reviews: 89,
      city: 'Los Angeles',
      cityRu: 'Лос-Анджелес',
      description: 'Professional Golden Retriever breeding with health guarantees',
      descriptionRu: 'Профессиональное разведение золотистых ретриверов с гарантией здоровья',
      contact: 'info@goldenretriever.com',
      phone: '+1-555-0456',
      address: '456 Breeder Lane, Los Angeles, CA 90210',
      addressRu: '456 Заводчик Лейн, Лос-Анджелес, CA 90210',
      website: 'https://goldenretriever.com',
      established: '2010',
      animals: [],
      logo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop&crop=center'
    },
    {
      id: '3',
      name: 'City Cat Rescue',
      nameRu: 'Городское Спасение Кошек',
      type: 'shelter',
      rating: 4.7,
      reviews: 203,
      city: 'Chicago',
      cityRu: 'Чикаго',
      description: 'Specializing in cat rescue and rehabilitation',
      descriptionRu: 'Специализируется на спасении и реабилитации кошек',
      contact: 'help@citycatrescue.org',
      phone: '+1-555-0789',
      address: '789 Cat Avenue, Chicago, IL 60601',
      addressRu: '789 Кошачья авеню, Чикаго, IL 60601',
      website: 'https://citycatrescue.org',
      established: '2018',
      animals: [],
      logo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop&crop=center'
    }
  ];

  // Sample animals with real photos
  animals = [
    {
      id: '1',
      name: 'Buddy',
      nameRu: 'Бадди',
      species: 'Dog',
      speciesRu: 'Собака',
      breed: 'Golden Retriever',
      breedRu: 'Золотистый ретривер',
      age: '2 years',
      ageRu: '2 года',
      gender: 'Male',
      genderRu: 'Самец',
      city: 'New York',
      cityRu: 'Нью-Йорк',
      price: 0,
      transferType: 'adoption',
      description: 'Friendly and energetic dog, great with kids. Loves playing fetch and going for long walks.',
      descriptionRu: 'Дружелюбная и энергичная собака, отлично ладит с детьми. Любит играть в апорт и долгие прогулки.',
      health: 'Vaccinated, neutered, microchipped. Recent vet checkup shows excellent health.',
      healthRu: 'Вакцинирован, кастрирован, чипирован. Недавний осмотр ветеринара показал отличное здоровье.',
      conditions: 'Needs a yard to play. Good with children and other dogs.',
      conditionsRu: 'Нужен двор для игр. Хорошо ладит с детьми и другими собаками.',
      photos: [
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&h=600&fit=crop&crop=center'
      ],
      shelterId: '1',
      dateAdded: new Date('2024-01-15'),
      status: 'available',
      weight: '30 kg',
      personality: ['Friendly', 'Energetic', 'Loyal', 'Playful'],
      personalityRu: ['Дружелюбный', 'Энергичный', 'Верный', 'Игривый']
    },
    {
      id: '2',
      name: 'Whiskers',
      nameRu: 'Усики',
      species: 'Cat',
      speciesRu: 'Кошка',
      breed: 'Persian',
      breedRu: 'Персидская',
      age: '1 year',
      ageRu: '1 год',
      gender: 'Female',
      genderRu: 'Самка',
      city: 'Los Angeles',
      cityRu: 'Лос-Анджелес',
      price: 500,
      transferType: 'sale',
      description: 'Beautiful Persian cat with long silky fur. Very calm and affectionate.',
      descriptionRu: 'Красивая персидская кошка с длинной шелковистой шерстью. Очень спокойная и ласковая.',
      health: 'Vaccinated, spayed, regular grooming required.',
      healthRu: 'Вакцинирована, стерилизована, требует регулярного ухода за шерстью.',
      conditions: 'Indoor cat only. Quiet household preferred.',
      conditionsRu: 'Только домашняя кошка. Предпочтительно тихий дом.',
      photos: [
        'https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=600&fit=crop&crop=center'
      ],
      shelterId: '2',
      dateAdded: new Date('2024-01-10'),
      status: 'available',
      weight: '4 kg',
      personality: ['Calm', 'Affectionate', 'Independent', 'Quiet'],
      personalityRu: ['Спокойная', 'Ласковая', 'Независимая', 'Тихая']
    },
    {
      id: '3',
      name: 'Charlie',
      nameRu: 'Чарли',
      species: 'Dog',
      speciesRu: 'Собака',
      breed: 'Labrador',
      breedRu: 'Лабрадор',
      age: '3 months',
      ageRu: '3 месяца',
      gender: 'Male',
      genderRu: 'Самец',
      city: 'Chicago',
      cityRu: 'Чикаго',
      price: 0,
      transferType: 'adoption',
      description: 'Playful puppy looking for a loving family. Very social and loves attention.',
      descriptionRu: 'Игривый щенок ищет любящую семью. Очень общительный и любит внимание.',
      health: 'First vaccinations done, dewormed. Next vaccination due in 2 weeks.',
      healthRu: 'Первые прививки сделаны, проглистогонен. Следующая вакцинация через 2 недели.',
      conditions: 'Needs training and socialization. Good with children.',
      conditionsRu: 'Нужна дрессировка и социализация. Хорошо ладит с детьми.',
      photos: [
        'https://images.unsplash.com/photo-1587402092301-725e37c70fd8?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&crop=center'
      ],
      shelterId: '1',
      dateAdded: new Date('2024-01-20'),
      status: 'available',
      weight: '8 kg',
      personality: ['Playful', 'Social', 'Curious', 'Energetic'],
      personalityRu: ['Игривый', 'Общительный', 'Любопытный', 'Энергичный']
    },
    {
      id: '4',
      name: 'Luna',
      nameRu: 'Луна',
      species: 'Cat',
      speciesRu: 'Кошка',
      breed: 'Maine Coon',
      breedRu: 'Мейн-кун',
      age: '6 months',
      ageRu: '6 месяцев',
      gender: 'Female',
      genderRu: 'Самка',
      city: 'Chicago',
      cityRu: 'Чикаго',
      price: 0,
      transferType: 'adoption',
      description: 'Beautiful Maine Coon kitten with striking blue eyes. Very intelligent and playful.',
      descriptionRu: 'Красивый котенок мейн-кун с поразительными голубыми глазами. Очень умная и игривая.',
      health: 'Fully vaccinated, spayed, microchipped.',
      healthRu: 'Полностью вакцинирована, стерилизована, чипирована.',
      conditions: 'Can live with other cats. Needs interactive toys.',
      conditionsRu: 'Может жить с другими кошками. Нужны интерактивные игрушки.',
      photos: [
        'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=800&h=600&fit=crop&crop=center'
      ],
      shelterId: '3',
      dateAdded: new Date('2024-01-18'),
      status: 'available',
      weight: '3 kg',
      personality: ['Intelligent', 'Playful', 'Gentle', 'Curious'],
      personalityRu: ['Умная', 'Игривая', 'Нежная', 'Любопытная']
    },
    {
      id: '5',
      name: 'Max',
      nameRu: 'Макс',
      species: 'Dog',
      speciesRu: 'Собака',
      breed: 'German Shepherd',
      breedRu: 'Немецкая овчарка',
      age: '4 years',
      ageRu: '4 года',
      gender: 'Male',
      genderRu: 'Самец',
      city: 'Los Angeles',
      cityRu: 'Лос-Анджелес',
      price: 800,
      transferType: 'sale',
      description: 'Well-trained German Shepherd with excellent temperament. Great guard dog and family companion.',
      descriptionRu: 'Хорошо обученная немецкая овчарка с отличным темпераментом. Отличная сторожевая собака и семейный компаньон.',
      health: 'Fully vaccinated, health certificate available. Hip dysplasia tested - clear.',
      healthRu: 'Полностью вакцинирован, справка о здоровье имеется. Тест на дисплазию тазобедренного сустава - чистый.',
      conditions: 'Experienced dog owner preferred. Needs daily exercise.',
      conditionsRu: 'Предпочтителен опытный владелец собак. Нужны ежедневные упражнения.',
      photos: [
        'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&h=600&fit=crop&crop=center'
      ],
      shelterId: '2',
      dateAdded: new Date('2024-01-12'),
      status: 'available',
      weight: '35 kg',
      personality: ['Loyal', 'Protective', 'Intelligent', 'Calm'],
      personalityRu: ['Верный', 'Защитный', 'Умный', 'Спокойный']
    },
    {
      id: '6',
      name: 'Bella',
      nameRu: 'Белла',
      species: 'Bird',
      speciesRu: 'Птица',
      breed: 'Cockatiel',
      breedRu: 'Корелла',
      age: '2 years',
      ageRu: '2 года',
      gender: 'Female',
      genderRu: 'Самка',
      city: 'New York',
      cityRu: 'Нью-Йорк',
      price: 150,
      transferType: 'sale',
      description: 'Beautiful cockatiel who loves to sing and whistle. Very social and friendly.',
      descriptionRu: 'Красивая корелла, которая любит петь и свистеть. Очень общительная и дружелюбная.',
      health: 'Healthy, vet-checked. Comes with health certificate.',
      healthRu: 'Здорова, проверена ветеринаром. Поставляется со справкой о здоровье.',
      conditions: 'Needs large cage and daily interaction. Comes with cage and accessories.',
      conditionsRu: 'Нужна большая клетка и ежедневное общение. Поставляется с клеткой и аксессуарами.',
      photos: [
        'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop&crop=center'
      ],
      shelterId: '1',
      dateAdded: new Date('2024-01-08'),
      status: 'available',
      weight: '0.1 kg',
      personality: ['Social', 'Musical', 'Friendly', 'Active'],
      personalityRu: ['Общительная', 'Музыкальная', 'Дружелюбная', 'Активная']
    }
  ];

  // Add sample user for feedback
  users.push({
    id: 'feedback-user',
    name: 'Feedback Manager',
    nameRu: 'Менеджер отзывов',
    email: 'feedback@animalmarket.com',
    password: '$2a$10$example', // This would be properly hashed
    userType: 'admin',
    dateJoined: new Date('2024-01-01'),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=center'
  });
}

// Initialize sample data
initializeSampleData();

// Routes
app.get('/', (req, res) => {
  const featuredAnimals = animals.slice(0, 6);
  const shelterAnimals = animals.filter(animal => animal.transferType === 'adoption');
  const puppiesKittens = animals.filter(animal => 
    animal.age.includes('month') || animal.age.includes('puppy') || animal.age.includes('kitten') ||
    animal.ageRu.includes('месяц') || animal.ageRu.includes('щенок') || animal.ageRu.includes('котенок')
  );
  
  res.render('index', {
    user: req.session.user,
    featuredAnimals,
    shelterAnimals,
    puppiesKittens,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

// Language switching
app.get('/lang/:language', (req, res) => {
  const { language } = req.params;
  if (['en', 'ru'].includes(language)) {
    req.session.language = language;
  }
  res.redirect(req.get('Referer') || '/');
});

app.get('/catalog', (req, res) => {
  let filteredAnimals = [...animals];
  
  // Apply filters
  if (req.query.species) {
    filteredAnimals = filteredAnimals.filter(animal => 
      animal.species.toLowerCase() === req.query.species.toLowerCase()
    );
  }
  
  if (req.query.transferType) {
    filteredAnimals = filteredAnimals.filter(animal => 
      animal.transferType === req.query.transferType
    );
  }
  
  if (req.query.city) {
    filteredAnimals = filteredAnimals.filter(animal => 
      animal.city.toLowerCase().includes(req.query.city.toLowerCase()) ||
      (animal.cityRu && animal.cityRu.toLowerCase().includes(req.query.city.toLowerCase()))
    );
  }
  
  // Apply sorting
  if (req.query.sort === 'date') {
    filteredAnimals.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  } else if (req.query.sort === 'price') {
    filteredAnimals.sort((a, b) => a.price - b.price);
  }
  
  res.render('catalog', {
    user: req.session.user,
    animals: filteredAnimals,
    filters: req.query,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/animal/:id', (req, res) => {
  const animal = animals.find(a => a.id === req.params.id);
  if (!animal) {
    return res.status(404).render('404', { 
      user: req.session.user,
      lang: res.locals.lang,
      t: res.locals.t
    });
  }
  
  const shelter = shelters.find(s => s.id === animal.shelterId);
  
  res.render('animal-profile', {
    user: req.session.user,
    animal,
    shelter,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/shelters', (req, res) => {
  res.render('shelters', {
    user: req.session.user,
    shelters,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/shelter/:id', (req, res) => {
  const shelter = shelters.find(s => s.id === req.params.id);
  if (!shelter) {
    return res.status(404).render('404', {
      user: req.session.user,
      lang: res.locals.lang,
      t: res.locals.t
    });
  }
  
  const shelterAnimals = animals.filter(a => a.shelterId === shelter.id);
  
  res.render('shelter-profile', {
    user: req.session.user,
    shelter,
    animals: shelterAnimals,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/login', (req, res) => {
  res.render('login', { 
    user: req.session.user, 
    error: null,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = user;
    res.redirect('/dashboard');
  } else {
    res.render('login', { 
      user: null, 
      error: res.locals.lang === 'ru' ? 'Неверные учетные данные' : 'Invalid credentials',
      lang: res.locals.lang,
      t: res.locals.t
    });
  }
});

app.get('/register', (req, res) => {
  res.render('register', { 
    user: req.session.user, 
    error: null,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.post('/register', async (req, res) => {
  const { name, email, password, userType } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.render('register', { 
      user: null, 
      error: res.locals.lang === 'ru' ? 'Email уже существует' : 'Email already exists',
      lang: res.locals.lang,
      t: res.locals.t
    });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuidv4(),
    name,
    email,
    password: hashedPassword,
    userType: userType || 'individual',
    dateJoined: new Date(),
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=center'
  };
  
  users.push(newUser);
  req.session.user = newUser;
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  const userAnimals = animals.filter(a => a.ownerId === req.session.user.id);
  
  res.render('dashboard', {
    user: req.session.user,
    animals: userAnimals,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.get('/add-animal', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  res.render('add-animal', { 
    user: req.session.user,
    lang: res.locals.lang,
    t: res.locals.t
  });
});

app.post('/add-animal', upload.array('photos', 5), (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  const photos = req.files.map(file => '/uploads/' + file.filename);
  
  const newAnimal = {
    id: uuidv4(),
    name: req.body.name,
    nameRu: req.body.nameRu || req.body.name,
    species: req.body.species,
    speciesRu: req.body.speciesRu || req.body.species,
    breed: req.body.breed,
    breedRu: req.body.breedRu || req.body.breed,
    age: req.body.age,
    ageRu: req.body.ageRu || req.body.age,
    gender: req.body.gender,
    genderRu: req.body.genderRu || req.body.gender,
    city: req.body.city,
    cityRu: req.body.cityRu || req.body.city,
    price: parseInt(req.body.price) || 0,
    transferType: req.body.transferType,
    description: req.body.description,
    descriptionRu: req.body.descriptionRu || req.body.description,
    health: req.body.health,
    healthRu: req.body.healthRu || req.body.health,
    conditions: req.body.conditions,
    conditionsRu: req.body.conditionsRu || req.body.conditions,
    photos: photos,
    ownerId: req.session.user.id,
    dateAdded: new Date(),
    status: 'pending_approval'
  };
  
  animals.push(newAnimal);
  res.redirect('/dashboard');
});

// Feedback routes
app.get('/feedback', (req, res) => {
  res.render('feedback', {
    user: req.session.user,
    lang: res.locals.lang,
    t: res.locals.t,
    success: req.query.success
  });
});

app.post('/feedback', (req, res) => {
  const newFeedback = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    rating: parseInt(req.body.rating) || 5,
    dateSubmitted: new Date(),
    userId: req.session.user ? req.session.user.id : null
  };
  
  feedback.push(newFeedback);
  res.redirect('/feedback?success=1');
});

// Contact animal owner
app.post('/contact-animal/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Please login first' });
  }
  
  const animal = animals.find(a => a.id === req.params.id);
  if (!animal) {
    return res.status(404).json({ error: 'Animal not found' });
  }
  
  const newMessage = {
    id: uuidv4(),
    animalId: animal.id,
    fromUserId: req.session.user.id,
    fromUserName: req.session.user.name,
    fromUserEmail: req.session.user.email,
    toShelterId: animal.shelterId,
    subject: `Interest in ${animal.name}`,
    message: req.body.message,
    dateCreated: new Date(),
    status: 'unread'
  };
  
  messages.push(newMessage);
  res.json({ success: true, message: 'Message sent successfully!' });
});

// Contact shelter
app.post('/contact-shelter/:id', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Please login first' });
  }
  
  const shelter = shelters.find(s => s.id === req.params.id);
  if (!shelter) {
    return res.status(404).json({ error: 'Shelter not found' });
  }
  
  const newMessage = {
    id: uuidv4(),
    fromUserId: req.session.user.id,
    fromUserName: req.session.user.name,
    fromUserEmail: req.session.user.email,
    toShelterId: shelter.id,
    subject: req.body.subject || 'General Inquiry',
    message: req.body.message,
    dateCreated: new Date(),
    status: 'unread'
  };
  
  messages.push(newMessage);
  res.json({ success: true, message: 'Message sent successfully!' });
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// API endpoints for AJAX requests
app.get('/api/animals/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const results = animals.filter(animal => 
    animal.name.toLowerCase().includes(query) ||
    animal.species.toLowerCase().includes(query) ||
    animal.breed.toLowerCase().includes(query)
  ).slice(0, 10);
  
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Animal Marketplace server running on http://localhost:${PORT}`);
});