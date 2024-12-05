import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Auth & Profile
      "Sign In": "Sign In",
      "Sign Up": "Sign Up",
      "Logout": "Logout",
      "Points": "Points",
      
      // Navigation
      "Home": "Home",
      "Search": "Search",
      "Profile": "Profile",
      "Leaderboard": "Leaderboard",
      
      // Course related
      "My Courses": "My Courses",
      "Continue Learning": "Continue Learning",
      "Popular Courses": "Popular Courses",
      "Start Course": "Start Course",
      "Complete Course": "Complete Course",
      
      // Common
      "Premium": "Premium",
      "Ranking": "Ranking",
      "Change Language": "Change Language",
      "Select Language": "Select Language",
      "Settings": "Settings",
      "Welcome": "Welcome",
      "Search courses...": "Search courses...",
      
      // Course Categories
      "All Categories": "All Categories",
      "Programming": "Programming",
      "Design": "Design",
      "Business": "Business",
      
      // Buttons & Actions
      "Get Started": "Get Started",
      "Continue": "Continue",
      "Cancel": "Cancel",
      "Save": "Save",
      "Edit": "Edit",
      
      // HomeScreen specific
      "Hello": "Hello",
      "Let's start learning": "Let's start learning",
      "Learning Progress": "Learning Progress",
      "Course Categories": "Course Categories",
      "View All": "View All",
      "Recommended Courses": "Recommended Courses",
      "Continue Learning": "Continue Learning",
      "Popular Courses": "Popular Courses",
      "Free": "Free",
      "Premium": "Premium",
      "lessons": "lessons",
      "Complete": "Complete",
      "Start Learning": "Start Learning",
      "minutes": "minutes",
      "Basic Courses": "Basic Courses",
      "Advanced Courses": "Advanced Courses",
      "Learning Progress": "Learning Progress",
      "Hello": "Hello",
      "Let's start learning": "Let's start learning",
      "View All": "View All",
      "My Learning Journey": "My Learning Journey",
      "In Progress": "In Progress",
      "Completed": "Completed",
      "No courses in progress": "No courses in progress",
      "No completed courses": "No completed courses",
      // Kurs kartları için çeviriler
      "Start Course": "Start Course",
      "Continue Course": "Continue Course",
      "Course Completed": "Course Completed",
      "lessons": "lessons",
      "Leaderboard": "Leaderboard",
      "Points": "Points",
      "Loading...": "Loading...",
      "No rankings available": "No rankings available",
      "Top Players": "Top Players",
      "Global Ranking": "Global Ranking",
      "No courses available": "No courses available",
      "Chapters": "Chapters",
      "Time": "Time"
    }
  },
  tr: {
    translation: {
      // Auth & Profile
      "Sign In": "Giriş Yap",
      "Sign Up": "Kayıt Ol",
      "Logout": "Çıkış Yap",
      "Points": "Puan",
      
      // Navigation
      "Home": "Ana Sayfa",
      "Search": "Arama",
      "Profile": "Profil",
      "Leaderboard": "Lider Tablosu",
      
      // Course related
      "My Courses": "Kurslarım",
      "Continue Learning": "Öğrenmeye Devam Et",
      "Popular Courses": "Popüler Kurslar",
      "Start Course": "Kursa Başla",
      "Complete Course": "Kursu Tamamla",
      
      // Common
      "Premium": "Premium",
      "Ranking": "Sıralama",
      "Change Language": "Dil Değiştir",
      "Select Language": "Dil Seçin",
      "Settings": "Ayarlar",
      "Welcome": "Hoş Geldiniz",
      "Search courses...": "Kurs ara...",
      
      // Course Categories
      "All Categories": "Tüm Kategoriler",
      "Programming": "Programlama",
      "Design": "Tasarım",
      "Business": "İş Dünyası",
      
      // Buttons & Actions
      "Get Started": "Başla",
      "Continue": "Devam Et",
      "Cancel": "İptal",
      "Save": "Kaydet",
      "Edit": "Düzenle",
      
      // HomeScreen specific
      "Hello": "Merhaba",
      "Let's start learning": "Haydi öğrenmeye başlayalım",
      "Learning Progress": "Öğrenme İlerlemesi",
      "Course Categories": "Kurs Kategorileri",
      "View All": "Tümünü Gör",
      "Recommended Courses": "Önerilen Kurslar",
      "Continue Learning": "Öğrenmeye Devam Et",
      "Popular Courses": "Popüler Kurslar",
      "Free": "Ücretsiz",
      "Premium": "Premium",
      "lessons": "ders",
      "Complete": "Tamamla",
      "Start Learning": "Öğrenmeye Başla",
      "minutes": "dakika",
      "Basic Courses": "Temel Kurslar",
      "Advanced Courses": "İleri Seviye Kurslar",
      "Learning Progress": "Öğrenme İlerlemesi",
      "Hello": "Merhaba",
      "Let's start learning": "Haydi öğrenmeye başlayalım",
      "View All": "Tümünü Gör",
      "My Learning Journey": "Öğrenme Yolculuğum",
      "In Progress": "Devam Eden",
      "Completed": "Tamamlanan",
      "No courses in progress": "Devam eden kurs bulunmuyor",
      "No completed courses": "Tamamlanan kurs bulunmuyor",
      // Kurs kartları için çeviriler
      "Start Course": "Kursa Başla",
      "Continue Course": "Kursa Devam Et",
      "Course Completed": "Kurs Tamamlandı",
      "lessons": "ders",
      "Leaderboard": "Lider Tablosu",
      "Points": "Puan",
      "Loading...": "Yükleniyor...",
      "No rankings available": "Sıralama bulunmuyor",
      "Top Players": "En İyi Oyuncular",
      "Global Ranking": "Genel Sıralama",
      "No courses available": "Kurs bulunamadı",
      "Chapters": "Bölüm",
      "Time": "Süre"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // varsayılan dil
    fallbackLng: 'en', // çeviri bulunamazsa İngilizce'ye dön
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 