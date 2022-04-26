<template>
    <div class="dashboard">
        <MainLayout>
            <template v-slot:left>
                <h1>main content go here</h1>
                <p>paste the html between 2 template tag</p>
                <Button text="123" />
                <Select
                    :list="list"
                    text="select a name"
                    :selected="selected"
                    @dataUpdated="(item) => selected = item.name"
                />
            </template>
            <template v-slot:right>
                <p>sidebar go here</p>
            </template>
        </MainLayout>
    </div>
</template>

<script>
import MainLayout from "../components/MainLayout";
import Button from "../components/general/Button";
import Select from "../components/general/Select";

export default {
    name: "Dashboard",
    data() {
        return {
            list: [
                {
                    name: "name 1",
                    value: "value 1",
                },
                {
                    name: "name 2",
                    value: "value 2",
                },
                {
                    name: "name 3",
                    value: "value 3",
                },
            ],
            selected: null
        };
    },
    components: {
        MainLayout,
        Button,
        Select,
    },
};
</script>

<style scoped>
</style>