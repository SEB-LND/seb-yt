import React, { useState } from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { supabase } from "../supabaseClient.ts";

/* ── Landing Page Color ────────────────────────────
   Primary Blue  : #0072CE
   Dark Blue     : #005BA5
   Brand Green   : #B5BD00
   White         : #FFFFFF
   Light BG      : #F2F6FB
   Text Primary  : #0A1E35
   Text Muted    : #4A6A8A
──────────────────────────────────────────────────────────── */

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(to right, #FFFFFF 0%, #FFFFFF 30%, #e8f3fc 44%, #99c9ed 52%, #0072CE 64%, #005BA5 100%);
`;

// Left Panel
const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 60px 50px;
  background: transparent;
  overflow: hidden;
  animation: ${fadeUp} 0.6s ease both;
`;

const LogoWrapper = styled.div`
  position: relative;
  z-index: 1;

  img {
    display: block;
    max-width: 400px;
    height: auto;
    filter: drop-shadow(0 2px 10px rgba(0, 114, 206, 0.12));
  }
`;

const GreenAccentBar = styled.div`
  width: 48px;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, #B5BD00, #D4DE00);
  position: relative;
  z-index: 1;
`;

const Tagline = styled.p`
  font-family: 'Poppins', sans-serif;
  font-size: 1.05rem;
  font-weight: 400;
  color: #4A6A8A;
  letter-spacing: 0.02em;
  text-align: center;
  max-width: 240px;
  line-height: 1.7;
  position: relative;
  z-index: 1;
`;

const PoweredBadge = styled.div`
  position: absolute;
  bottom: 28px;
  font-size: 0.7rem;
  color: #B0C4D8;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  z-index: 1;
`;

// Right Panel 
const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 50px;
  background: transparent;
  position: relative;
  overflow: hidden;
`;

const Card = styled.div`
  background: #FFFFFF;
  border-radius: 18px;
  padding: 48px 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0, 40, 100, 0.25), 0 4px 16px rgba(0,0,0,0.1);
  animation: ${fadeUp} 0.6s 0.12s ease both;
  position: relative;
  z-index: 1;
`;

const CardEyebrow = styled.p`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #B5BD00;
  margin: 0 0 10px;
`;

const CardHeading = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #0A1E35;
  margin: 0 0 6px;
  line-height: 1.2;
`;

const CardSubtext = styled.p`
  font-size: 0.875rem;
  color: #4A6A8A;
  font-weight: 400;
  margin: 0 0 32px;
  line-height: 1.5;
`;

// Form
const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #0072CE;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 13px 16px;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
  background: #F2F6FB;
  border: 1.5px solid ${({ $hasError }) => $hasError ? '#E05252' : '#C8D8EC'};
  border-radius: 10px;
  color: #0A1E35;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  letter-spacing: 0.1em;

  &::placeholder {
    color: #A0B8CC;
    letter-spacing: 0.05em;
  }

  &:focus {
    border-color: #0072CE;
    background: #FFFFFF;
    box-shadow: 0 0 0 3px rgba(0, 114, 206, 0.12);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0A1E35;
  background: linear-gradient(135deg, #B5BD00 0%, #939900 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: opacity 0.2s, box-shadow 0.2s, transform 0.15s;
  box-shadow: 0 4px 18px rgba(181, 189, 0, 0.4);

  &:hover {
    opacity: 0.9;
    box-shadow: 0 6px 24px rgba(181, 189, 0, 0.55);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(181, 189, 0, 0.3);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px 14px;
  background: rgba(224, 82, 82, 0.06);
  border: 1px solid rgba(224, 82, 82, 0.25);
  border-radius: 8px;
  color: #C03030;
  font-size: 0.84rem;
  font-weight: 400;
  line-height: 1.4;
  animation: ${fadeUp} 0.3s ease both;

  &::before {
    content: '⚠';
    font-size: 0.9rem;
    flex-shrink: 0;
  }
`;

const EyeButton = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: #7A9AB8;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover { color: #0072CE; }
`;

// Component
const LandingPage = ({ onSuccess }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const trimmedCode = code.trim();
    if (!trimmedCode) { setError("Please enter an access code."); return; }
    setLoading(true);
    try {
      const { data, error: sbError } = await supabase
        .from("access codes")
        .select("*")
        .ilike("code", trimmedCode)
        .single();

      if (sbError || !data) {
        setError("Incorrect code. Please try again.");
        return;
      }
      localStorage.setItem("access_granted", "true");
      if (onSuccess) onSuccess();
      history.push("/main");
    } catch (err) {
      console.error("Error checking access code:", err.message);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>

        {/* ── Left: Logo Panel ── */}
        <LeftPanel>
          <LogoWrapper>
            <img
              src="https://www.sarawakenergy.com/assets/images/general/logo.png"
              alt="Sarawak Energy"
            />
          </LogoWrapper>
          <GreenAccentBar />
          <Tagline>Powering Sarawak's sustainable future</Tagline>
          <PoweredBadge>Sarawak Energy Berhad</PoweredBadge>
        </LeftPanel>

        {/* ── Right: Form Panel ── */}
        <RightPanel>
          <Card>
            <CardEyebrow>Secure Access</CardEyebrow>
            <CardHeading>Welcome Back</CardHeading>
            <CardSubtext>Enter your access code to continue to the portal.</CardSubtext>

            <form onSubmit={handleSubmit}>
              <Label htmlFor="access-code">Access Code</Label>
              <InputWrapper>
                <Input
                  id="access-code"
                  type={showPassword ? "text" : "password"}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="•••••••"
                  $hasError={!!error}
                  autoComplete="off"
                  style={{ paddingRight: '44px' }}
                />
                <EyeButton
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? "Hide code" : "Show code"}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </EyeButton>
              </InputWrapper>

              <Button type="submit" disabled={loading}>
                {loading ? "Verifying…" : "Continue →"}
              </Button>
            </form>

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </Card>
        </RightPanel>

      </Container>
    </>
  );
};

export default LandingPage;