## react-mui-simple-form-validation

### Installation

```
yarn add react-mui-simple-form-validation
```
```
npm install  react-mui-simple-form-validation
```
------
### Usage

#### Simple Login Page
Create **LoginFormFields.component.js**
```javascript
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import {
	withFormValidation,
	InputWithValid,
} from 'react-mui-simple-form-validation';


const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  }
}));

let LoginFormFields = (props) => {
  const { fields } = props;
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <InputWithValid
          classTextField={classes.textField}
          name="name"
          label="Name"
          value={fields.name}
          inputProps={{ pattern: '.{3,40}' }} // can use this prop or 'regexp' prop
          errorText="From 3 to 40 chapters"
          required={true}
          {...props}
        />
      </Grid>
      <Grid item xs={12}>
        <InputWithValid
            classTextField={classes.textField}
            name="email"
            label="Email"
            regexp='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' // can use this prop or 'inputProps={{ pattern: '.{3,40}' }}' prop
            value={fields.email}
            errorText="Example: characters@characters.domain "
            required
            {...props}
          />
      </Grid>
    </>  
  )
}
const LoginFormWithValid = withFormValidation(LoginFormFields);

export default LoginFormWithValid;
```
Then create **LoginForm.component.js**

```javascript
import LoginFormWithValid from './path/to/LoginFormWithValid';

let initialUser = {
  name: '',
  email: ''
};

const LoginForm = () => {
  const [user, setUser] =  useState(initialUser);

  const onChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (!Array.isArray(value) && value.trim() === '') {
      value = '';
    }
    setUser({...user,[name]: value});
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setUser(initialUser);
    console.log('Submit');
  }

  return (
    <Grid container alignItems='center'>
      <LoginFormWithValid
        fields={user}
        onChange={onChange}
        onSubmit={onSubmit}
        submitBtn={{ value: 'Login' }}
        btnsGridContainer={{alignItems: 'center'}}
        btnGridItem={{xs: 12}}
      />
    </Grid>
  )
}
export default LoginForm;
```
That's all!

You can also use **MultipleChipSelectWithValid** component 

```javascript
import { MultipleChipSelectWithValid } from 'react-mui-simple-form-validation';

const InputTitle = () => (
	<MultipleChipSelectWithValid
		name="categories"
		label="Categories"
		fullWidth
		selectValues={categories}
		value={fields.categories}
		required
		{...props}
	/>
)
```
*MultipleChipSelectWithValid* use *Select*, *FormControl*, *InputLabel*, *Input*, *MenuItem*, *Chip* components;

#### Supported *Props* for withFormValidation
|  Name |  Type |  Options |
| ------------ | ------------ | ------------ |
|  fields | object  |   |
|  onSubmit | function   |   |
|  children | node   |   |
|  btnsGridContainer | object  |  alignContent,  alignItems, direction, justify, classGridContainer,  spacing, wrap|
|  btnGridItem | object  |  classGridItem, lg, md, sm, xl, xs, zeroMinWidth |
|  submitBtn | object  |  value, classButton, color, variant, size, component, disableFocusRipple, disableRipple, fullWidth |

Component has a structure : 
```html
<form>
	<BaseComponent></BaseComponent>
	<Grid container> <!--btnsGridContainer -->
		<Grid item> <!--btnGridItem -->
			<Button /> <!--submitBtn -->
		</Grid>
		{children}  <!--here you can add extra buttons -->
	</Grid>
</form>

```
#### Supported *Props* for InputWithValid

|  Name |  Type | Comments  |
| ------------ | ------------ | ------------ |
| name  |  string | required  |
| value  |  any |  required |
| errorText |  string |   |
|  rows | number  |   |
|  label |  string |   |
| required |  bool |   |
|onChange|func|required|
|autoComplete|string||
|regexp|string||
|autoFocus|bool||
|disabled|bool||
|fullWidth|bool||
|margin|string||
|FormHelperTextProps|object|https://material-ui.com/ru/api/form-helper-text/|
|InputLabelProps|object|https://material-ui.com/ru/api/input-label/|
|select|bool||
|variant|string||
|SelectProps|object|https://material-ui.com/ru/api/select/|
|selectValues|array|must be in format [{**value**: 12323, **label**: 'USA'}]|
|type|string||
|inputProps|object|https://material-ui.com/ru/api/input/|
|classTextField|string||
|classMenuItem|string| for 'select' type|
|classInputAdornment|string|for 'password' type|
|classIconButton|string|for 'password' type|
 
#### Supported *Props* for MultipleChipSelectWithValid
|Name   | Type  |  Comments |
| ------------ | ------------ | ------------ |
|  name |  string |  required |
| value  |  array |  required |
|  label |  string |   |
|  required | bool  |   |
|  fullWidth | bool  |   |
| onChange  | func  |  required |
|MenuProps|object|https://material-ui.com/ru/api/menu/|
|selectValues|array|['value1, 'value2', 'value3']|
|classFormControl|string||
|classInputControl|string||
|classMenuItem|string||
|classChips|string||
|classSelect|string|||

Enjoy! :=)

#### License
MIT
