// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import BookForm from "./components/BookForm";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/detail/:id" element={<BookDetail />} />
                <Route path="/create" element={<BookForm />} />
                <Route path="/edit/:id" element={<BookForm />} />
            </Routes>
        </Router>
    );
};

export default App;
