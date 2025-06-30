import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContent/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContent/taskActions';

export function Settings() {
  useEffect(() => {
    document.title = 'Configurações - Settings';
  }, []);

  const { state, dispatch } = useTaskContext();

  const workTimeInput = useRef<HTMLInputElement>(null);
  const shortBreakTimeInput = useRef<HTMLInputElement>(null);
  const LongBreakTimeInput = useRef<HTMLInputElement>(null);

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    showMessage.dismiss();
    const formErrors = [];
    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(LongBreakTimeInput.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Digite apenas números para TODOS os campos');
    }

    if (workTime < 1 || workTime > 99) {
      formErrors.push('Digite valores entre 1 e 99 para foco');
    }

    if (shortBreakTime < 1 || shortBreakTime > 30) {
      formErrors.push('Digite valores entre 1 e 30 para descanso curto');
    }

    if (longBreakTime < 1 || longBreakTime > 60) {
      formErrors.push('Digite valores entre 1 e 60 para descanso longo');
    }

    if (formErrors.length > 0) {
      formErrors.forEach(error => {
        showMessage.error(error);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    showMessage.success('Configurações Salvas');
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
        <Container>
          <p style={{ textAlign: 'center' }}>
            Modifique as configurações para tempo de foco, descanso curto e
            descanso longo
          </p>
        </Container>

        <Container>
          <form onSubmit={handleSaveSettings} action='' className='form'>
            <div className='formRow'>
              <DefaultInput
                id='workTime'
                placeholder='Foco'
                labelText='Foco'
                ref={workTimeInput}
                defaultValue={state.config.workTime}
                type='number'
              ></DefaultInput>

              <DefaultInput
                id='shortBreakTime'
                placeholder='Descanso Curto'
                labelText='Descanso Curto'
                ref={shortBreakTimeInput}
                defaultValue={state.config.shortBreakTime}
                type='number'
              ></DefaultInput>

              <DefaultInput
                id='longBreakTime'
                placeholder='Descanso Longo'
                labelText='Descanso Longo'
                ref={LongBreakTimeInput}
                defaultValue={state.config.longBreakTime}
                type='number'
              ></DefaultInput>

              <DefaultButton
                icon={<SaveIcon />}
                aria-label='Salvar Configurações'
                title='Salvar'
              ></DefaultButton>
            </div>
          </form>
        </Container>
      </Container>
    </MainTemplate>
  );
}
