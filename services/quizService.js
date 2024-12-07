import { db } from './firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'

export const fetchQuizzes = async () => {
  try {
    const quizCollection = collection(db, 'quizzes')
    const querySnapshot = await getDocs(quizCollection)
    const quizzes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    return quizzes
  } catch (error) {
    console.error('Error fetching quizzes:', error)
    throw error
  }
} 