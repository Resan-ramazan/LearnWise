import React, { createContext, useContext, useState } from 'react';
import { getInProgressCourses, handleCoursePress as getCourseDetails } from '../services/courses';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [inProgressCourses, setInProgressCourses] = useState([]);

  const fetchInProgressCourses = async (userEmail) => {
    try {
      const courses = await getInProgressCourses(userEmail);
      setInProgressCourses(courses);
      return courses;
    } catch (error) {
      console.error("Error fetching in-progress courses:", error);
      setInProgressCourses([]);
      return [];
    }
  };

  const handleCoursePress = async (course) => {
    try {
      const courseDetails = await getCourseDetails(course.courseId);
      if (courseDetails) {
        setCurrentCourse(courseDetails);
        return courseDetails;
      }
      return null;
    } catch (error) {
      console.error("Error in handleCoursePress:", error);
      return null;
    }
  };

  return (
    <CourseContext.Provider
      value={{
        userEnrolledCourses,
        currentCourse,
        inProgressCourses,
        getInProgressCourses: fetchInProgressCourses,
        handleCoursePress,
        updateCurrentCourse: setCurrentCourse,
        updateEnrolledCourses: setUserEnrolledCourses,
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

export default CourseContext; 