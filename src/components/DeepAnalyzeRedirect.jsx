import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DeepAnalyzeRedirect() {
  const { session } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate(`/chat/history/${session}`);
    }
  }, [session, navigate]);

  return null; // This component doesn't render anything
}

export default DeepAnalyzeRedirect;