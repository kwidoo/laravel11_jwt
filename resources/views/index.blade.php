<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="robots" content="noindex">
  <title>{{ config('app.name') }}</title>
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body>
<div id="app"></div>
{{-- Global configuration object --}}
@php
  $config = [
      'appName' => config('app.name'),
      'locale' => $locale = app()->getLocale()
  ];
@endphp
<script>window.config = @json($config);</script>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
