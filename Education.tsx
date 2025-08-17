
import React, { useState } from 'react';
interface Lesson { id: number; title: string; completed: boolean }
const Education: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: 1, title: 'Lesson 1: Introduction', completed: false },
    { id: 2, title: 'Lesson 2: Advanced Topics', completed: false },
  ]);
  return (
    <div>
      <h2>Education Modules</h2>
      <ul>
        {lessons.map(lesson => (
          <li key={lesson.id}>
            {lesson.title} - {lesson.completed ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Education;
