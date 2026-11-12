var StorageManager = {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  saveFormState(formId, stateKey) {
    const form = document.getElementById(formId);
    if (!form) return;

    const state = {};
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        state[input.name] = input.checked;
      } else {
        state[input.name] = input.value;
      }
    });

    this.save(stateKey, state);
  },

  loadFormState(formId, stateKey) {
    const form = document.getElementById(formId);
    if (!form) return;

    const state = this.load(stateKey);
    if (!state) return;

    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = state[input.name] === true;
      } else if (input.name in state) {
        input.value = state[input.name];
      }
    });
  },

  saveTroopSelection(stateKey) {
    const troopPopover = document.getElementById('troopPopover');
    if (!troopPopover) return;

    const checkboxes = troopPopover.querySelectorAll('input[type="checkbox"]');
    const selection = {};

    checkboxes.forEach(checkbox => {
      selection[checkbox.value] = checkbox.checked;
    });

    this.save(stateKey, selection);
  },

  loadTroopSelection(stateKey) {
    const troopPopover = document.getElementById('troopPopover');
    if (!troopPopover) return;

    const state = this.load(stateKey);
    if (!state) return;

    const checkboxes = troopPopover.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
      if (checkbox.value in state) {
        checkbox.checked = state[checkbox.value];
      }
    });
  }
};