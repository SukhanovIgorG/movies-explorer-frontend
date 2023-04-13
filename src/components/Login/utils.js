import {REG_EMAIL} from '../../constants/constants';

export const validationPassword = (value) => {
  if (value.length < 1) {
    return `Пароль не может быть пустым`;
  } else {
    return '';
  }
};

export const validationEmail = (value) => {
  if (!REG_EMAIL.test(value)) {
    return `${value} не является электронной почтой`;
  } else {
    return '';
  }
};
