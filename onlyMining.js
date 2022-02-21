(async () => {
  // ==============================================
  // ============ Mining only version =============
  // ==============================================
  
  // Delay after mine [min, max] [5sec, 15sec]
  const delayAfterMine = [5 * 1000, 15 * 1000];
  // Delay before repair begins [min, max] [8sec, 15sec]
  const delayBeforeRepair = [8 * 1000, 15 * 1000];
  // Delay after repair begins [min, max] [1sec, 3sec]
  const delayAfterRepair = [1 * 1000, 3 * 1000];

  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  setInterval(() => {
    const buttonClosePopup = document.querySelector(
      ".modal .plain-button.short"
    );

    if (buttonClosePopup) buttonClosePopup.click();
  }, random(1, 2) * 1000);

  setInterval(() => {
    const buttonCloseCPUPopup = document.querySelector(
      ".modal-stake .modal-stake-close img"
    );

    if (buttonCloseCPUPopup) buttonCloseCPUPopup.click();
  }, random(1, 2) * 1000);


  while (1) {
    try {
        for (const [, item] of document
          .querySelectorAll(".vertical-carousel-container img")
          .entries()) {
          // Restore energy start
          const currentFish = Math.floor(
            +document.querySelectorAll(".resource-number")[2].innerText
          );
          const [currentEnergy, maxEnergy] = document
            .querySelectorAll(".resource-number")[3]
            .textContent.split("/")
            .map(Number);

          if (maxEnergy - currentEnergy > 300 && currentFish > 1) {
            const countEnergyClicks = Math.min(
              currentFish,
              Math.floor((maxEnergy - currentEnergy) / 5)
            );

            if (countEnergyClicks > 0) {
              document.querySelector(".resource-energy img").click();
              await new Promise((res) => setTimeout(res, random(1, 2) * 1000));

              for (let i = 0; i++ < countEnergyClicks + 1; ) {
                document
                  .querySelector(".image-button[alt='Plus Icon']")
                  .click();
                await new Promise((res) =>
                  setTimeout(res, random(1, 4) * 50)
                );
              }
              document.querySelector(".modal-wrapper .plain-button").click();
              await new Promise((res) =>
                setTimeout(res, random(15, 15) * 1000)
              );
            }
          }
          // Restore energy end

          item.click();

          await new Promise((res) => setTimeout(res, random(1, 3) * 1000));

          const buttonMine = document.querySelector(
            ".info-section .plain-button"
          );
          
          
          const timeToEnd = document.querySelector(
            ".info-section .info-time"
          ).innerText;
          
          
          if (
            ![...buttonMine.classList].includes("disabled") &&
            (timeToEnd === "00:00:00")
          ) {
            buttonMine.click();

            await new Promise((res) =>
              setTimeout(res, random(...delayAfterMine))
            );

              await new Promise((res) =>
                setTimeout(res, random(...delayBeforeRepair))
              );

              // Repair instruments
              const buttonRepair = document.querySelectorAll(
                ".info-section .plain-button"
              )[1];
              if (buttonRepair) {
                const quality = eval(
                  document.querySelector(".card-number").innerText
                );
                if (
                  ![...buttonRepair.classList].includes("disabled") &&
                  quality < 0.3
                ) {
                  buttonRepair.click();
                  await new Promise((res) =>
                    setTimeout(res, random(...delayAfterRepair))
                  );
                }
              }
        }
      }
    } catch (e) {
    }
  }
})();
