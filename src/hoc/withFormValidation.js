/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function makeFieldsForValidationArray(fields) {
  const f = { ...fields };
  // eslint-disable-next-line no-unused-vars
  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(f, key)) {
      if (!key.includes('_')) {
        if (f[key].length && f[key].length > 0) {
          f[key] = true;
        } else {
          f[key] = false;
        }
      }
    }
  }
  return f;
}
const withFormValidation = (BaseComponent) => {
  class Form extends Component {
    state = {
      fieldsForValidation: {},
      isFormValid: false,
    }

    componentDidMount() {
      // eslint-disable-next-line react/destructuring-assignment
      this.fillInFields();
    }

    componentDidUpdate(prevProps) {
      const { fields } = this.props;
      if (fields !== prevProps.fields) {
        this.fillInFields();
      }
      this.getIsValidForm();
    }

    fillInFields = () => {
      const { fields } = this.props;
      this.setState({ fieldsForValidation: makeFieldsForValidationArray(fields) });
    }

    getIsValidField = (name, isValid) => {
      this.setState((prevState) => ({ fieldsForValidation: { ...prevState.fieldsForValidation, [name]: isValid } }));
    }

    getIsValidForm = () => {
      const { fieldsForValidation, isFormValid } = this.state;
      const isValid = Object.values(fieldsForValidation).indexOf(false) === -1;
      if (isValid !== isFormValid) {
        this.setState({ isFormValid: isValid });
      }
    }

    onSubmitValidForm = (e) => {
      const { onSubmit } = this.props;
      onSubmit(e);
    }

    render() {
      const {
        children,
        btnsGridContainer,
        btnGridItem,
        submitBtn,
      } = this.props;
      const { isFormValid } = this.state;
      const { onSubmitValidForm } = this;

      const {
        alignContent: alignContentBGC,
        alignItems: alignItemsBGC,
        direction: directionBGC,
        justify: justifyBGC,
        classGridContainer,
        spacing: spacingBGC,
        wrap: wrapBGC,
      } = btnsGridContainer || {};
      const {
        classGridItem,
        lg: lgBGI,
        md: mdBGI,
        sm: smBGI,
        xl: xlBGI,
        xs: xsBGI,
        zeroMinWidth: zeroMinWidthBGI,
      } = btnGridItem || {};
      const {
        value,
        color,
        variant,
        size,
        classButton,
        component,
        disableFocusRipple,
        disableRipple,
        fullWidth,
      } = submitBtn || {};

      return (
        <form>
          <BaseComponent
            {...this.props}
            getIsValidField={this.getIsValidField}
          />
          <Grid
            alignContent={alignContentBGC || 'stretch'}
            alignItems={alignItemsBGC || 'stretch'}
            container
            className={classGridContainer}
            direction={directionBGC || 'column'}
            justify={justifyBGC || 'flex-start'}
            spacing={spacingBGC || 0}
            wrap={wrapBGC || 'wrap'}
          >
            <Grid
              item
              className={classGridItem}
              lg={lgBGI || false}
              md={mdBGI || false}
              sm={smBGI || false}
              xl={xlBGI || false}
              xs={xsBGI || false}
              zeroMinWidth={zeroMinWidthBGI || false}
            >
              <Button
                disabled={!isFormValid}
                variant={variant || 'outlined'}
                color={color || 'primary'}
                size={size || 'medium'}
                component={component || 'button'}
                disableFocusRipple={disableFocusRipple || false}
                disableRipple={disableRipple || false}
                className={classButton}
                fullWidth={fullWidth || false}
                onClick={onSubmitValidForm}
              >
                {value || 'Submit'}
              </Button>
            </Grid>
            {children}
          </Grid>
        </form>
      );
    }
  }

  Form.propTypes = {
    fields: PropTypes.object,
    onSubmit: PropTypes.func,
    children: PropTypes.node,
    submitBtn: PropTypes.object,
    btnsGridContainer: PropTypes.object,
    btnGridItem: PropTypes.object,
  };
  Form.displayName = `withFormValidation(${BaseComponent.displayName || BaseComponent.name || 'Component'})`;
  return Form;
};


export default withFormValidation;
