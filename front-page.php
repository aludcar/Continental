<?php get_header(); 

?>


<div id="render-react"></div>

<?php if (have_posts()) {
  while(have_posts()) {
    the_post(); ?>
    <div>
      <?php the_content(); ?>
    </div>
  <?php }
}
?>


<?php
get_footer();


