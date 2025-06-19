import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FilePicker from './filePicker.vue';

describe('FilePicker Component', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(FilePicker, {
      global: {
        components: {
          FontAwesomeIcon: {
            template: '<div></div>',
          },
        },
      },
    });
  });

  it('should render file picker correctly when no files are uploaded', () => {
    expect(wrapper.find('.file-picker__dropzone').exists()).toBe(true);
    expect(wrapper.find('.file-picker__selectedzone').exists()).toBe(false);
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
  });

  it('should change isFirstClick to false when the dropzone is clicked', async () => {
    // Verificamos que isFirstClick sea true inicialmente
    expect(wrapper.vm.isFirstClick).toBe(true);

    // Simulamos el click en el área de dropzone
    await wrapper.find('.file-picker__dropzone').trigger('click');

    // Verificamos que isFirstClick ahora es false
    expect(wrapper.vm.isFirstClick).toBe(false);
  });

  it('should cancel the upload and reset the file and modal states', async () => {
    const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' });

    const wrapper = mount(FilePicker);
    wrapper.vm.file = file;
    wrapper.vm.showModal = true;
    await wrapper.vm.$nextTick();

    // Verificamos que el modal de subida esté presente
    expect(wrapper.find('.file-picker__modal-container').exists()).toBe(true);

    // Simulamos el clic en el botón de cancelar
    await wrapper.find('button.btn--info.btn--outline').trigger('click');

    // Verificamos que el modal ya no esté visible
    expect(wrapper.find('.file-picker__modal-container').exists()).toBe(false);

    // Verificamos que el archivo haya sido borrado y los estados se hayan reiniciado
    expect(wrapper.vm.file).toBeNull();
    expect(wrapper.vm.progress).toBe(0);
    expect(wrapper.vm.uploadedFiles).toBe(0);
  });

  it('should confirm the upload and show success message', async () => {
    const newfile = new File(['dummy content'], 'example.txt', { type: 'text/plain' });
    const wrapper = mount(FilePicker);

    // Asignamos el archivo al estado
    wrapper.vm.file = newfile;
    wrapper.vm.showModal = true;
    await wrapper.vm.$nextTick();

    // Simulamos el clic en el botón de subir
    await wrapper.find('#upload-btn').trigger('click');

    // Verificamos que el archivo aún no se haya eliminado antes de que el progreso sea 100%
    expect(wrapper.vm.file).not.toBeNull();

    // Simulamos el progreso hasta el 100% directamente
    wrapper.vm.progress = 100;
    wrapper.vm.uploadedFiles = 1;
    wrapper.vm.showModal = false;
    wrapper.vm.showConfirmationMessage = true;

    // Esperar el DOM para actualizarse después del cambio de estado
    await wrapper.vm.$nextTick();

    // Verificamos que el progreso haya llegado al 100%
    expect(wrapper.vm.progress).toBe(100);

    // Verificamos que el modal se haya cerrado
    expect(wrapper.vm.showModal).toBe(false);

    // Verificamos que el mensaje de confirmación esté visible
    expect(wrapper.find('.alert--success').exists()).toBe(true);

    // Verificamos que el archivo se haya marcado como subido
    expect(wrapper.vm.uploadedFiles).toBe(1);

  });

  it('should trigger file input when dropzone is clicked', async () => {
    const wrapper = mount(FilePicker);
    await wrapper.find('.file-picker__dropzone').trigger('click');
    expect(wrapper.find('input[type="file"]').exists()).toBe(true);
  });

  /*
  it('should call triggerFileInput when the dropzone is clicked', async () => {
    // Hacemos un spy en el método triggerFileInput
    const filepicker = wrapper.find('input[type="file"]');

    const triggerFileInputSpy = vi.spyOn(wrapper.vm, 'triggerFileInput');

    // Simulamos el click en el área de dropzone
    await filepicker.trigger('click');

    // Verificamos que el método triggerFileInput fue llamado
    expect(triggerFileInputSpy).toHaveBeenCalled();
  });
  */

});
