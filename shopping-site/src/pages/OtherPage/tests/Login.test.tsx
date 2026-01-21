import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';

describe('Login Component', () => {
  test('renders the login form', () => {
    render(<Login />);
    expect(screen.getByRole('heading', { name: '로그인' })).toBeInTheDocument();
    expect(screen.getByLabelText('이메일:')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  test('allows input changes', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('이메일:');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    expect(emailInput).toHaveValue('john@example.com');
  });

  test('logs form data on submit', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Login />);
    const emailInput = screen.getByLabelText('이메일:');
    const passwordInput = screen.getByLabelText('비밀번호:');
    const submitButton = screen.getByRole('button', { name: '로그인' });

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('로그인 데이터:', {
      email: 'john@example.com',
      password: 'password123',
    });
    consoleSpy.mockRestore();
  });
});