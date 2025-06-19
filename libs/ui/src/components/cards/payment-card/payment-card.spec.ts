import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import PaymentCard from './payment-card.vue'; // Ajusta el path según tu estructura

describe('PaymentCard.vue', () => {

  it('renders the payment method name correctly', () => {
    const wrapper = mount(PaymentCard, {
      props: {
        name: 'Transferencia',
      },
    });
    expect(wrapper.find('.payment-card__info').text()).toBe('Transferencia');
  });

  it('renders the default bank, currency, and account information', () => {
    const wrapper = mount(PaymentCard);

    expect(wrapper.findAll('.payment-card__info')[1].text()).toBe('Banco de Costa Rica');
    expect(wrapper.findAll('.payment-card__info')[2].text()).toBe('Colones');
    expect(wrapper.findAll('.payment-card__info')[3].text()).toBe('CR02015202001159781714');
  });

  it('renders the icon correctly', () => {
    const wrapper = mount(PaymentCard, {
      props: {
        icon: ['fas', 'colon-sign'],
      },
    });

    const icon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
    expect(icon.exists()).toBe(true);
    expect(icon.props('icon')).toEqual(['fas', 'colon-sign']);
  });

  it('renders props correctly when passed', () => {
    const wrapper = mount(PaymentCard, {
      props: {
        name: 'Tarjeta de Crédito',
        bank: 'Banco Nacional',
        currency: 'Dólares',
        account: 'CR12345678901234567890',
      },
    });

    expect(wrapper.findAll('.payment-card__info')[0].text()).toBe('Tarjeta de Crédito');
    expect(wrapper.findAll('.payment-card__info')[1].text()).toBe('Banco Nacional');
    expect(wrapper.findAll('.payment-card__info')[2].text()).toBe('Dólares');
    expect(wrapper.findAll('.payment-card__info')[3].text()).toBe('CR12345678901234567890');
  });
});
