import {useState} from 'react'
import {Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import BookNewTrip from './components/BookNewTrip'
import MyTrips from './components/MyTrips'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import TravelTripContextValue from './context/TravelTripContextValue'

import './App.css'

const App = () => {
  const [myTripsList, setMyTripsList] = useState([])

  const addTripList = tripsDetails => {
    setMyTripsList(prevList => [...prevList, tripsDetails])
  }

  return (
    <TravelTripContextValue.Provider
      value={{
        myTripsList,
        addTripList,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-a-new-trip"
          element={
            <ProtectedRoute>
              <BookNewTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-trips"
          element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TravelTripContextValue.Provider>
  )
}

export default App
