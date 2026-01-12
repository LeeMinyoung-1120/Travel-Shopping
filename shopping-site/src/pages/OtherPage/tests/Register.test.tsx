import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../Register';

describe('Register Component', () => {
  test('renders the registration form', () => {
    render(<Register />);
    expect(screen.getByRole('heading', { name: '회원가입' })).toBeInTheDocument();
    expect(screen.getByLabelText('이름:')).toBeInTheDocument();
    expect(screen.getByLabelText('이메일:')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호:')).toBeInTheDocument();
    expect(screen.getByLabelText('비밀번호 확인:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '회원가입' })).toBeInTheDocument();
  });

  test('allows input changes', () => {
    render(<Register />);
    const nameInput = screen.getByLabelText('이름:');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput).toHaveValue('John Doe');
  });

  test('shows alert on password mismatch', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Register />);
    const nameInput = screen.getByLabelText('이름:');
    const emailInput = screen.getByLabelText('이메일:');
    const passwordInput = screen.getByLabelText('비밀번호:');
    const confirmInput = screen.getByLabelText('비밀번호 확인:');
    const submitButton = screen.getByRole('button', { name: '회원가입' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'different' } });
    fireEvent.click(submitButton);

    expect(alertMock).toHaveBeenCalledWith('비밀번호가 일치하지 않습니다.');
    alertMock.mockRestore();
  });

  test('logs form data on successful submit', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Register />);
    const nameInput = screen.getByLabelText('이름:');
    const emailInput = screen.getByLabelText('이메일:');
    const passwordInput = screen.getByLabelText('비밀번호:');
    const confirmInput = screen.getByLabelText('비밀번호 확인:');
    const submitButton = screen.getByRole('button', { name: '회원가입' });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('회원가입 데이터:', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    consoleSpy.mockRestore();
  });
});