export const PersonalDataForm = () => {
   const handleSubmit = e => {
      e.preventDefault()
   }

   return (
      <>
         <form id="personalDataForm" onSubmit={handleSubmit}>
            <p>Dane osobowe</p>
            <input type="text" id="firstName" name="firstName" placeholder="Imię" />
            <input type="text" id="lastName" name="lastName" placeholder="Nazwisko" />
            <input type="email" id="email" name="email" placeholder="E-mail" />
            <input type="tel" id="phone" name="phone" placeholder="Numer telefonu" />
            <p>Preferencje kursu</p>
            <label htmlFor="learningMode">Wybierz Formę nauki:</label>
            <input type="radio" id="offline" name="learningMode" value="offline" />
            <label htmlFor="offline">Stacjonarnie</label>
            <input type="radio" id="online" name="learningMode" value="online" />
            <label htmlFor="online">Online</label>
            <label htmlFor="technologies">Preferowane technologie:</label>
            <select id="technologies" name="technologies" multiple>
               <option value="React">React</option>
               <option value="NodeJS">NodeJS</option>
               <option value="HTML">HTML</option>
               <option value="CSS">CSS</option>
               <option value="NextJS">NextJS</option>
            </select>
            <p>Załącz swoje CV (JPEG lub PNG):</p>
            <input type="file" id="cv" name="cv" accept="image/jpeg, image/png"></input>
            <p>Doświadczenie w programowaniu</p>
            <label htmlFor="experience">Czy posiadasz doświadczenie w programowaniu?</label>
            <input type="checkbox" id="experience" name="experience" />
            <div id="experienceDetails">
               <select id="technologiesExperience" name="technologiesExperience">
                  <option value="React">React</option>
                  <option value="NodeJS">NodeJS</option>
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="NextJS">NextJS</option>
               </select>
               <label htmlFor="experienceRating">Poziom zaawansowania:</label>
               <select id="experienceRating" name="experienceRating">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
               </select>
               <input type="button" value="Dodaj Doświadczenie" id="addExperience" />
            </div>
            <button type="submit">Wyślij zgłoszenie</button>
         </form>
      </>
   )
}
