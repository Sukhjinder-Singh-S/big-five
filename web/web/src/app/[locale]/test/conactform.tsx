'use client';
import React, { useState, FormEvent } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const ContactFormModal: React.FC = () => {
  const router = useRouter();
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
    console.log('Form Data Submitted:', formValues);
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
    handleClose();
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
            sx={{margin:"0px"}}
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
            sx={{margin:"0px"}}
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

// 'use client';
// import React, { useState, FormEvent } from 'react';
// import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, Box, MenuItem, Select, InputLabel } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';

// interface Field {
//   name: string;
//   label: string;
//   type: string;
//   options?: { value: string; label: string }[];
// }

// const initialFields: Field[] = [
//   { name: 'firstName', label: 'First Name', type: 'text' },
//   { name: 'lastName', label: 'Last Name', type: 'text' },
//   { name: 'email', label: 'Email', type: 'email' },
//   { name: 'phone', label: 'Phone', type: 'tel' },
//   { name: 'age', label: 'Age', type: 'number' },
//   { name: 'pincode', label: 'pincode', type: 'text' },
//   { name: 'question1', label: 'I have read, understood and agree to the website terms and Mutuo Health’s Privacy Policy. (Must be checked)?', type: 'radio', options: [
//     { value: 'true', label: 'Yes' },
//     { value: 'false', label: 'No' }
//   ]},
//   { name: 'question2', label: 'Yes, sign me up to receive electronic communications about contests, events and offers.', type: 'radio', options: [
//     { value: 'true', label: 'Yes' },
//     { value: 'false', label: 'No' }
//   ]}
// ];

// const ContactFormModal: React.FC = () => {
//   const [open, setOpen] = useState<boolean>(true);
//   const [fields, setFields] = useState<Field[]>(initialFields);
//   const [formValues, setFormValues] = useState<Record<string, string>>(
//     initialFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
//   );
//   const [isLoading, setLoading] = useState<boolean>(false);

//   // Dialog state for adding fields
//   const [openAddFieldDialog, setOpenAddFieldDialog] = useState<boolean>(false);
//   const [newFieldType, setNewFieldType] = useState<string>('text');
//   const [newFieldLabel, setNewFieldLabel] = useState<string>('');

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleAddFieldDialogOpen = () => setOpenAddFieldDialog(true);
//   const handleAddFieldDialogClose = () => setOpenAddFieldDialog(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddField = () => {
//     const newFieldName = newFieldLabel.toLowerCase().replace(/\s+/g, '');
//     const newField: Field = { name: newFieldName, label: newFieldLabel, type: newFieldType };
//     if (newFieldType === 'radio') {
//       newField.options = [
//         { value: 'true', label: 'Yes' },
//         { value: 'false', label: 'No' }
//       ];
//     }
//     setFields([...fields, newField]);
//     setFormValues(prev => ({ ...prev, [newFieldName]: '' }));
//     handleAddFieldDialogClose();
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     console.log('Form Data Submitted:', formValues);
//     await new Promise<void>((resolve) => setTimeout(resolve, 1000));
//     setLoading(false);
//     handleClose();
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>User Details</DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent>
//             {fields.map((field) => (
//               field.type === 'radio' ? (
//                 <FormControl key={field.name} component="fieldset" margin="dense">
//                   <DialogTitle sx={{padding:"0px"}}>{field.label}</DialogTitle>
//                   <RadioGroup
//                     name={field.name}
//                     value={formValues[field.name] || ''}
//                     onChange={handleChange}
//                     row
//                   >
//                     {field.options?.map(option => (
//                       <FormControlLabel
//                         key={option.value}
//                         value={option.value}
//                         control={<Radio />}
//                         label={option.label}
//                       />
//                     ))}
//                   </RadioGroup>
//                 </FormControl>
//               ) : (
//                 <TextField
//                   key={field.name}
//                   label={field.label}
//                   name={field.name}
//                   type={field.type}
//                   value={formValues[field.name] || ''}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                   margin="dense"
//                 />
//               )
//             ))}
//             <Box mt={2}>
//               <Button
//                 variant="outlined"
//                 startIcon={<AddIcon />}
//                 onClick={handleAddFieldDialogOpen}
//               >
//                Add More Detail About You ?
//               </Button>
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button
//               type="submit"
//               color="primary"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Submitting...' : 'Submit'}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>

//       {/* Add Field Dialog */}
//       <Dialog open={openAddFieldDialog} onClose={handleAddFieldDialogClose}>
//         <DialogTitle>Add More Detail About You ?</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Field Title"
//             value={newFieldLabel}
//             onChange={(e) => setNewFieldLabel(e.target.value)}
//             fullWidth
//             margin="dense"
//           />
//           <InputLabel>Field Type</InputLabel>
//           <Select
//             value={newFieldType}
//             onChange={(e) => setNewFieldType(e.target.value as string)}
//             fullWidth
//             margin="dense"
//           >
//             <MenuItem value="text">Text</MenuItem>
//             <MenuItem value="number">Number</MenuItem>
//             <MenuItem value="email">Email</MenuItem>
//             <MenuItem value="radio">Radio</MenuItem>
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddFieldDialogClose}>Cancel</Button>
//           <Button onClick={handleAddField} color="primary">Add Field</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ContactFormModal;
