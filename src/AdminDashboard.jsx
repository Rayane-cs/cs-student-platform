import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import FileUploader from './FileUploader';
import ModuleChat from './ModuleChat';  // ✅ import added

export default function AdminDashboard({ session }) {  // ✅ make sure session comes in
  const [years, setYears] = useState([]);
  const [modules, setModules] = useState([]);
  const [newYear, setNewYear] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [newModule, setNewModule] = useState('');

  useEffect(() => {
    fetchYears();
    fetchModules();
  }, []);

  const fetchYears = async () => {
    const { data } = await supabase.from('years').select('*');
    setYears(data);
  };

  const fetchModules = async () => {
    const { data } = await supabase.from('modules').select('*');
    setModules(data);
  };

  const addYear = async () => {
    if (!newYear) return;
    await supabase.from('years').insert([{ name: newYear }]);
    setNewYear('');
    fetchYears();
  };

  const addModule = async () => {
    if (!newModule || !selectedYear) return;
    await supabase.from('modules').insert([{ name: newModule, year_id: selectedYear }]);
    setNewModule('');
    fetchModules();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Add College Year</h3>
      <input
        type="text"
        value={newYear}
        onChange={(e) => setNewYear(e.target.value)}
        placeholder="Year name"
      />
      <button onClick={addYear}>Add Year</button>

      <h3>Add Module</h3>
      <select onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year.id} value={year.id}>{year.name}</option>
        ))}
      </select>
      <input
        type="text"
        value={newModule}
        onChange={(e) => setNewModule(e.target.value)}
        placeholder="Module name"
      />
      <button onClick={addModule}>Add Module</button>

      <h3>Modules List</h3>
      <ul>
        {modules.map((mod) => (
          <li key={mod.id}>
            {mod.name} (Year: {mod.year_id})
            <FileUploader moduleId={mod.id} />
            <ModuleChat moduleId={mod.id} user={session.user} />  {/* ✅ added here */}
          </li>
        ))}
      </ul>
    </div>
  );
}
