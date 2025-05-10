import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import ProblemBoard from './ProblemBoard';

import Auth from './Auth';

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) loadProfile(session.user.id);
    });
  }, []);

  const loadProfile = async (userId) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (!error) setProfile(data);
  };

  if (!session) return <Auth />;

  return (
    <div>
      <h1>CS Student Platform</h1>
      <p>Welcome, {profile ? profile.full_name : 'User'}!</p>
      {profile && profile.is_admin && <AdminDashboard />}
      <h2>Programming Problems Section</h2>
      {session && <ProblemBoard user={session.user} />}
    </div>
  );
}

export default App;
