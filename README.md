# Animal Marketplace - Web Application

A comprehensive online marketplace platform for animal adoption and sales, similar to Wildberries but focused exclusively on animals. The platform connects animal shelters, breeders, and individual owners with people looking to adopt or purchase pets.

## 🐾 Features

### Core Functionality
- **Home Page**: Marketplace-style layout with search, categories, and featured collections
- **Animal Catalog**: Browse animals with advanced filtering and sorting options
- **Animal Profiles**: Detailed animal information pages with photos, health info, and adoption conditions
- **Shelter & Breeder Profiles**: Dedicated pages for shelters and breeders with ratings and reviews
- **User Authentication**: Registration and login system with different user types
- **Dashboard**: User management interface for listings and account settings
- **Add Animal**: Form for users to list animals for adoption or sale

### Key Features
- **Search & Filters**: Filter by animal type, breed, age, gender, city, and transfer type
- **Categories**: Dogs, cats, birds, small pets, and more
- **Transfer Types**: Free adoption and paid sales
- **Safety & Moderation**: All listings are moderated for user protection
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **User Types**: Individual users, shelters, and professional breeders

## 🚀 Quick Start

### Option 1: Static Demo (No Installation Required)
1. Open `index.html` in your web browser
2. This provides a fully functional demo of the user interface
3. All interactive elements are demonstrated with placeholder functionality

### Option 2: Full Node.js Application
1. **Prerequisites**: Install Node.js (v14 or higher) and npm
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start the Server**:
   ```bash
   npm start
   ```
4. **Access the Application**: Open http://localhost:3000 in your browser

## 📁 Project Structure

```
animal-marketplace/
├── server.js                 # Main server file
├── package.json             # Dependencies and scripts
├── index.html              # Static demo version
├── views/                  # EJS templates
│   ├── partials/          # Header and footer partials
│   ├── index.ejs          # Home page
│   ├── catalog.ejs        # Animal catalog
│   ├── animal-profile.ejs # Individual animal page
│   ├── shelters.ejs       # Shelters listing
│   ├── shelter-profile.ejs # Individual shelter page
│   ├── login.ejs          # Login page
│   ├── register.ejs       # Registration page
│   ├── dashboard.ejs      # User dashboard
│   └── add-animal.ejs     # Add animal form
├── public/                # Static assets
│   ├── css/
│   │   └── style.css      # Custom styles
│   ├── js/
│   │   └── main.js        # Client-side JavaScript
│   └── images/            # Image assets
└── README.md              # This file
```

## 🛠 Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templating, Bootstrap 5, Font Awesome
- **Styling**: Custom CSS with Bootstrap components
- **File Upload**: Multer for handling animal photos
- **Session Management**: Express-session
- **Security**: bcryptjs for password hashing

## 📱 Pages & Functionality

### 1. Home Page (`/`)
- Hero section with call-to-action
- Search functionality with filters
- Animal categories (Dogs, Cats, Birds, Small Pets)
- Featured collections:
  - Animals from Shelters
  - Puppies and Kittens
  - Urgent Adoption
  - Popular Listings

### 2. Animal Catalog (`/catalog`)
- Grid/list view toggle
- Advanced filtering system
- Sorting options (date, popularity, price)
- Pagination support
- Animal cards with key information

### 3. Animal Profile (`/animal/:id`)
- Photo gallery with thumbnails
- Detailed animal information
- Health and vaccination status
- Adoption/transfer conditions
- Shelter/breeder information
- Contact functionality

### 4. Shelters & Breeders (`/shelters`)
- List of verified shelters and breeders
- Filter by type (shelter vs breeder)
- Ratings and reviews
- Contact information
- Success statistics

### 5. User Authentication
- **Registration** (`/register`): Create account with user type selection
- **Login** (`/login`): Secure authentication
- **Dashboard** (`/dashboard`): Manage listings and account

### 6. Add Animal (`/add-animal`)
- Comprehensive form for animal details
- Photo upload (up to 5 images)
- Transfer type selection (adoption/sale)
- Health information and conditions

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3000)
- `SESSION_SECRET`: Session encryption key

### Sample Data
The application includes sample data for demonstration:
- 3 sample animals (dogs, cats, birds)
- 2 sample shelters/breeders
- Various animal categories and breeds

## 🎨 Design Features

- **Modern UI**: Clean, professional design with smooth animations
- **Responsive Layout**: Mobile-first approach with Bootstrap grid
- **Color Scheme**: Primary blue theme with success green for adoptions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Icons**: Font Awesome icons throughout the interface
- **Cards**: Consistent card-based layout for animals and shelters

## 🔒 Security Features

- Password hashing with bcryptjs
- Session-based authentication
- Input validation and sanitization
- File upload restrictions
- CSRF protection ready
- Moderation system for listings

## 🚀 Deployment

### Local Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production
```bash
npm start    # Standard production start
```

### Environment Setup
1. Set environment variables
2. Configure file upload directories
3. Set up database (currently uses in-memory storage)
4. Configure email service for notifications

## 📈 Future Enhancements

- **Database Integration**: PostgreSQL or MongoDB
- **Real-time Messaging**: Socket.io for user communication
- **Payment Processing**: Stripe integration for paid listings
- **Email Notifications**: Automated adoption updates
- **Advanced Search**: Elasticsearch integration
- **Mobile App**: React Native companion app
- **Admin Panel**: Content moderation interface
- **API**: RESTful API for third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐕 About

This Animal Marketplace platform was designed to help connect loving families with animals in need of homes. By providing a familiar e-commerce-style interface, we make it easy for users to find their perfect companion while supporting local shelters and responsible breeders.

The platform prioritizes animal welfare, user safety, and ease of use to create a trusted environment for animal adoption and sales.

---

**Made with ❤️ for animals and their future families**