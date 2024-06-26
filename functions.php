<?php

add_action('wp_enqueue_scripts', 'liquid_child_theme_style', 99);

function liquid_parent_theme_scripts()
{
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

}
function liquid_child_theme_style()
{
    wp_enqueue_style('child-hub-style', get_stylesheet_directory_uri() . '/style.css');
    wp_enqueue_script('continentalmainjs', get_theme_file_uri('/build/index.js'), array('wp-element'), '1.1', true);
    wp_enqueue_script('shippingjs', get_theme_file_uri('/inc/js/shipping.js'), array('wp-element'), '1.1' . true);
	wp_enqueue_script('authenticationjs', get_theme_file_uri('/inc/js/authentication.js'), array('wp-element'), '1.1' . true);
    wp_enqueue_script('agenciesjs', get_theme_file_uri('/inc/js/agencies.js'), array('wp-element'), '1.1' . true);
    wp_enqueue_script('customFetchjs', get_theme_file_uri('/inc/js/customFetch.js'), array('wp-element'), '1.1' . true);
    wp_enqueue_style('continentalmaincss', get_theme_file_uri('/build/index.css'));
    wp_localize_script('continentalmainjs', 'continentalData', array(
        'root_url' => get_site_url(),
    ));
}

function boilerplate_load_assets()
{

}

add_action('wp_enqueue_scripts', 'boilerplate_load_assets');
