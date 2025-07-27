import React, { useEffect, useState } from 'react';
import SignUp from './Signup.jsx'
import { supabase } from './supabaseClient.js';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import GoogleLoginButton from './GoogleLoginButton.jsx';
import './App.css';  
import './index.css'
import 

function App() {
  const [session, setSession] = useState(null);


  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);


  const products = [
    {
      name: "Yonex Racket",
      image: "https://i.pinimg.com/736x/6f/dc/1e/6fdc1ee5025d523cb63c5e3d57f2660b.jpg",
      link: "https://www.yonex.com",
    },
    {
      name: "Li-Ning Racket",
      image: "https://i.pinimg.com/736x/06/20/13/0620132b29b92bf3c25f5e54fff2d50f.jpg",
      link: "https://www.li-ning.com",
    },
    {
      name: "Badminton Shoes",
      image: "https://i.pinimg.com/1200x/04/73/4c/04734c3869b1caf5ac7c5d4cd6379e91.jpg",
      link: "https://www.nike.com",
    },
    {
      name: "Shuttlecocks",
      image: "https://i.pinimg.com/736x/fc/4d/d3/fc4dd3e6098313971e6a4d48c0964740.jpg",
      link: "https://www.amazon.in",
    },
    {
      name: "Grip Pack",
      image: "https://i.pinimg.com/1200x/97/5d/ed/975dedfc578b8903e05d6569db10371a.jpg",
      link: "https://www.flipkart.com",
    },
    {
      name: "Badminton Net",
      image: "https://i.pinimg.com/1200x/a0/2e/8a/a02e8afa826aac16d2dca7d24a2a7153.jpg",
      link: "https://www.decathlon.in",
    },
    {
      name: "Kit Bag",
      image: "https://i.pinimg.com/1200x/a4/fe/18/a4fe183cc7abafd993f3c0725389794c.jpg",
      link: "https://www.yonex.com",
    },
    {
      name: "Wristbands",
      image: "https://i.pinimg.com/736x/1c/78/4f/1c784f325237ce6188cbeb7bb2b2b3b1.jpg",
      link: "https://www.decathlon.in",
    },
    {
      name: "Badminton Socks",
      image: "https://i.pinimg.com/1200x/d2/25/c2/d225c275072e044d51f5e2b7bc86b12d.jpg",
      link: "https://www.amazon.in",
    },
    {
      name: "Headbands",
      image: "https://i.pinimg.com/736x/b9/bc/50/b9bc509afa1e0a97464d0463e1d99890.jpg",
      link: "https://www.flipkart.com",
    },
  ];

  return (
    <div className="app">
      <h1 className="welcome-text">Welcome to SmashMart</h1>
      <SignUp/>

      {session ? (
        <>
  


          <div className="product-grid">
            {products.map((product, index) => (
              <div key={index} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h2 className="product-name">{product.name}</h2>
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="product-link">
                  View Product
                </a>
            
 
              </div>

            ))}
          
          </div>

          <div className="logout-button">
            <Logout />
          </div>
          <footer className="footer">
  <p>© 2025 SmashMart. Built with ❤️ by Yogesh Kumar</p>
</footer>
        </>
      ) : (
        <div className="login-box">
          <Login />

          <GoogleLoginButton />
        </div>
      )}
    </div>
  );
}

export default App;
