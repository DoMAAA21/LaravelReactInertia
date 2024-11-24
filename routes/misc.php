<?php

Route::get('/locale/{locale}', function ($locale) {
    if (in_array($locale, ['en', 'ja'])) {
        session(['locale' => $locale]);
    }
    return redirect()->back();
});