<template lang="">
  <form>
    <div class="wedding_heading flex text-center mt-5">
      <h1>Chargez votre image ici !!!</h1>
      <h3>Laissez nous un petit mot également</h3>
    </div>
    <div class="wedding_form">
      <label for="picture">
        Charge ta photo
      </label>
      <input type="file" id="picture" required/>
      <label for="name">
        Ton nom et prénom
      </label>
      <input type="text" id="name" required/>
      <label for="tags">
        Tag des personnes (si tu le veux)
      </label>
      <input type="text" id="tags"/>
      <label for="description">
        Une petite description
      </label>
      <textarea id="description" required></textarea>
    </div>
    <div class="wedding_btn">
      <button type="submit">Partager</button>
    </div>
  </form>
  <section>
    <small>
        L'ensemble des images partagées est stocké sur notre ordinateur, dans cette même salle. Aucune image ne sera partagée en dehors de l'assemblée ici présente
    </small>
  </section>
</template>
<script>
export default {

}
</script>
<style lang="">

</style>