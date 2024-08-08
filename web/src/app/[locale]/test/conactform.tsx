'use client';
import React, { useState, FormEvent } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

const ContactFormModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    pincode: '',
    question1: '',
    question2: ''
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      const result = await response.json();
      console.log('API Response:', result);
      if (response.status === 201) {
        handleClose();
        console.log('Success ID:', result.data);
        localStorage.setItem('userId', result.data);
      } else {
        console.error('Error response:', result);
      }

    } catch (error) {
      console.error('Submit failed:', error);
      // Optionally, set some state to show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>User Details</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            value={formValues.phone}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formValues.age}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={formValues.pincode}
            onChange={handleChange}
            fullWidth
            required
            margin="dense"
          />
          
          {/* Question 1 */}
          <FormControl component="fieldset" margin="dense">
            <Typography>I have read, understood and agree to the website terms and Mutuo Health’s Privacy Policy. (Must be checked)?</Typography>
            <FormControlLabel
              sx={{ margin: "0px" }}
              label=""
              control={
                <RadioGroup
                  name="question1"
                  value={formValues.question1}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              }
            />
          </FormControl>

          {/* Question 2 */}
          <FormControl component="fieldset" margin="dense">
            <Typography>Yes, sign me up to receive electronic communications about contests, events and offers.</Typography>
            <FormControlLabel
              sx={{ margin: "0px" }}
              label=""
              control={
                <RadioGroup
                  name="question2"
                  value={formValues.question2}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContactFormModal;
