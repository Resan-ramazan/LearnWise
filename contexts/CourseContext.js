import React, { createContext, useContext, useState, useCallback } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);

  const updateEnrolledCourses = (courses) => {
    setUserEnrolledCourses(courses);
  };

  const updateCurrentCourse = (course) => {
    setCurrentCourse(course);
  };

  const refreshCourseData = useCallback(() => {
    setUserEnrolledCourses(prev => [...prev]);
  }, []);

  return (
    <CourseContext.Provider
      value={{
        userEnrolledCourses,
        currentCourse,
        updateEnrolledCourses,
        updateCurrentCourse,
        refreshCourseData
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}; 