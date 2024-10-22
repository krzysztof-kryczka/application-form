export const SummaryDataForm = ({ userData }) => {
   const { firstName, lastName, email, phone, experiences, learningMode, technologies, cv } = userData
   return (
      <>
         <h1>Dane z Formularza</h1>
         <div>
            <div>
               <h2>Dane osobowe:</h2>
               <p>Imię: {firstName}</p>
               <p>Nazwisko: {lastName}</p>
               <p>E-mail: {email}</p>
               <p>Telefon: {phone}</p>
            </div>
            <div>
               <h2>Doświadczenie w programowaniu:</h2>
               {experiences.length > 0 ? (
                  <ul>
                     {experiences.map(exp => {
                        return (
                           <li key={`${exp.technology}${exp.level}`}>
                              Technologia: {exp.technology} / poziom: {exp.level}
                           </li>
                        )
                     })}
                  </ul>
               ) : (
                  <li>Brak doświadczenia</li>
               )}
            </div>
            <div>
               <h2>Preferencje kursu:</h2>
               <p>Tryb kursu: {learningMode}</p>
               <p>Preferowane technologie:</p>
               <ul>
                  {technologies.map(tech => {
                     return <li key={tech}>{tech}</li>
                  })}
               </ul>
            </div>
            <div>
               <h2>Curriculum vitae:</h2>
               <img src={URL.createObjectURL(cv[0])} alt="" width={300} />
            </div>
         </div>
      </>
   )
}
