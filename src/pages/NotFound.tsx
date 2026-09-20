import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, Search } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center py-20">
      <Container size="sm" className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#FEF2F2] text-[#DC2626] mx-auto flex items-center justify-center mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626]">
          404 Error
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2444] mt-2 mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-[#475569] max-w-md mx-auto mb-8 leading-relaxed">
          The requested dialysis page or patient route does not exist or has been relocated within
          the Srikara Network.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={() => navigate('/')}
          >
            Return to Home
          </Button>

          <Button
            variant="outline"
            size="md"
            leftIcon={<Search className="w-4 h-4" />}
            onClick={() => navigate('/find-dialysis')}
          >
            Find Dialysis Slots
          </Button>
        </div>
      </Container>
    </div>
  );
};
