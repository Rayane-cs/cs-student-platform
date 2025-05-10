import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function ProblemBoard({ user }) {
  const [problems, setProblems] = useState([]);
  const [newProblem, setNewProblem] = useState({ title: '', description: '', language: '' });

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    const { data } = await supabase.from('problems').select('*').order('created_at', { ascending: false });
    setProblems(data);
  };

  const addProblem = async () => {
    const { title, description, language } = newProblem;
    if (!title || !language) return;
    await supabase.from('problems').insert([{ title, description, language, created_by: user.id }]);
    setNewProblem({ title: '', description: '', language: '' });
    fetchProblems();
  };

  return (
    <div>
      <h3>Programming Problems</h3>
      <input
        type="text"
        placeholder="Title"
        value={newProblem.title}
        onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Language"
        value={newProblem.language}
        onChange={(e) => setNewProblem({ ...newProblem, language: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newProblem.description}
        onChange={(e) => setNewProblem({ ...newProblem, description: e.target.value })}
      />
      <button onClick={addProblem}>Post Problem</button>

      <ul>
        {problems.map((prob) => (
          <li key={prob.id}>
            <b>{prob.title}</b> [{prob.language}]
            <p>{prob.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
