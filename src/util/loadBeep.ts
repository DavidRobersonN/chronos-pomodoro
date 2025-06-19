import gravitationBeep from '../assets/src_assets_audios_gravitational_beep.mp3';

export function loadBeep() {
  const audio = new Audio(gravitationBeep);
  //Deixando o audio engatilhado (carregado)
  audio.load();

  return () => {
    // alterando currentTime para 0, para exitar bugs
    audio.currentTime = 0;
    // Tocando o audio, e criado um catch para exibir algum erro que possa
    // acontecer ao tocar o audio
    audio.play().catch(error => console.log('Erro ao tocar áudio', error));
  };
}
